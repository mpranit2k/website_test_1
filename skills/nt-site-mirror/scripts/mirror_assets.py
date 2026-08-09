#!/usr/bin/env python3
"""Mirror the same-origin assets of a captured page into a local folder,
preserving deployed paths, and write an audit manifest of everything taken,
skipped, and failed.

This is the download stage of the Static Mirror pipeline:

    1. capture_assets.py  -> asset-graph.json     (observe what the page loads)
    2. mirror_assets.py   -> mirror/ + manifest   (download what is authorized)
    3. serve.py mirror/                           (preview with SPA fallback)
    4. viewports.py                               (validate vs. live source)

Authorization gate: this script refuses to run without --authorized "<context>".
The attestation string is recorded in mirror-manifest.json so every mirror
carries its own audit trail. By default ONLY same-origin assets are downloaded;
external hosts are skipped and listed in the manifest for classification
(Embed / Kept External / User-Supplied Replacement / Recreated From
Observation / Blocked). Use --allow-host for external hosts the user has
explicitly confirmed are licensed/authorized (e.g. the client's own CDN).
Provider-flagged assets (Vimeo, Mux, YouTube, paid font CDNs) are never
downloaded by this script, even with --allow-host. One exception: openly
licensed font hosts (Google Fonts — OFL/Apache, self-hostable) may be
downloaded for localization, but only when explicitly passed via --allow-host
after the user confirms licensing. Paid/protected font CDNs (Typekit,
Monotype, Hoefler&Co) stay blocked regardless.

--extra-urls <file> adds URLs found by deep discovery (bundle scans, public
repos/manifests, serve.py 404 logs) to the download set, one URL per line
(# comments allowed). The same authorization, same-origin, provider, and
--allow-host gates apply; each extra URL's outcome is recorded under
"extra_urls" in mirror-manifest.json.

Usage:
    python mirror_assets.py asset-graph.json --out mirror \
        --authorized "owner-approved staging migration for client X" \
        [--extra-urls urls.txt] [--allow-host cdn.clientdomain.com] \
        [--workers 4] [--delay 0]

Requires: Python 3 standard library only.
"""

import argparse
import json
import os
import posixpath
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urlparse
from urllib.request import Request, urlopen

USER_AGENT = "nt-site-mirror/1.1 (authorized mirroring; see mirror-manifest.json)"
SKIP_TYPES = {"websocket", "eventsource", "ping", "preflight"}

# Keep in sync with capture_assets.py. Used to gate --extra-urls entries,
# which arrive without the capture script's provider flag.
KNOWN_PROVIDERS = {
    "vimeo.com": "Vimeo", "player.vimeo.com": "Vimeo", "vimeocdn.com": "Vimeo",
    "youtube.com": "YouTube", "youtu.be": "YouTube", "ytimg.com": "YouTube",
    "googlevideo.com": "YouTube",
    "mux.com": "Mux", "litix.io": "Mux", "stream.mux.com": "Mux",
    "fonts.googleapis.com": "Google Fonts (openly licensed)",
    "fonts.gstatic.com": "Google Fonts (openly licensed)",
    "use.typekit.net": "Adobe Fonts (paid)", "p.typekit.net": "Adobe Fonts (paid)",
    "cloud.typography.com": "Hoefler&Co (paid)", "fast.fonts.net": "Monotype (paid)",
    "kit.fontawesome.com": "Font Awesome",
    "cdn.lottiefiles.com": "Lottie", "lottie.host": "Lottie",
    "cdn.rive.app": "Rive",
    "stream.cloudflare.com": "Cloudflare Stream",
    "wistia.com": "Wistia", "fast.wistia.net": "Wistia",
}

# Openly licensed, self-hostable font hosts. Download still requires the user
# to pass the host via --allow-host (licensing confirmed). Paid font CDNs are
# never downloadable, with or without --allow-host.
OPEN_LICENSE_FONT_HOSTS = {"fonts.googleapis.com", "fonts.gstatic.com"}


def provider_for(host):
    host = (host or "").lower()
    for key, name in KNOWN_PROVIDERS.items():
        if host == key or host.endswith("." + key):
            return name
    return None


def local_path_for(url, out_dir):
    """Map a URL to a deployed-path-preserving local file path, safely."""
    pu = urlparse(url)
    path = pu.path or "/"
    if path.endswith("/"):
        path += "index.html"
    root, ext = posixpath.splitext(path)
    if ext == "":
        # Extensionless document route -> route/index.html so serve.py and
        # plain static hosting both resolve it.
        path = path.rstrip("/") + "/index.html"
    rel = posixpath.normpath(path.lstrip("/"))
    # Path-traversal guard: never write outside out_dir.
    target = os.path.normpath(os.path.join(out_dir, rel))
    if not target.startswith(os.path.abspath(out_dir) + os.sep):
        return None
    return target


def download(url, target, timeout, delay):
    if delay:
        time.sleep(delay)
    req = Request(url, headers={"User-Agent": USER_AGENT})
    with urlopen(req, timeout=timeout) as resp:
        data = resp.read()
    os.makedirs(os.path.dirname(target), exist_ok=True)
    with open(target, "wb") as f:
        f.write(data)
    return len(data)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("graph", help="asset-graph.json from capture_assets.py")
    parser.add_argument("--out", default="mirror")
    parser.add_argument("--authorized", default=None,
                        help='REQUIRED. User-stated authorization context, e.g. "client-approved staging migration".')
    parser.add_argument("--allow-host", action="append", default=[],
                        help="external host explicitly confirmed as licensed/authorized (repeatable)")
    parser.add_argument("--extra-urls", default=None,
                        help="file of URLs (one per line, # comments) from deep discovery: bundle scans, repos/manifests, serve.py 404 logs. Same gates as graph entries.")
    parser.add_argument("--workers", type=int, default=4)
    parser.add_argument("--delay", type=float, default=0.0, help="seconds between requests per worker")
    parser.add_argument("--timeout", type=int, default=30)
    args = parser.parse_args()

    if not args.authorized or not args.authorized.strip():
        sys.exit(
            "Refusing to mirror without authorization context.\n"
            "Static Mirror Mode is only for owner-controlled, client-approved, staging,\n"
            "migration, internal, or otherwise authorized work. Re-run with:\n"
            '    --authorized "<who authorized this and for what>"\n'
            "If authorization is unclear, use Editable Recreation Mode instead."
        )

    with open(args.graph) as f:
        graph = json.load(f)

    page_url = graph.get("page", "")
    page_host = urlparse(page_url).netloc
    allow = {h.strip().lower() for h in args.allow_host}
    out_dir = os.path.abspath(args.out)
    os.makedirs(out_dir, exist_ok=True)

    to_download, skipped_external, skipped_provider, skipped_other = [], [], [], []
    requests = list(graph.get("requests", []))

    # Ensure the page document itself is mirrored even if the capture's
    # request list stored it under a redirected URL.
    if page_url and not any(r.get("url") == page_url for r in requests):
        requests.insert(0, {"url": page_url, "resource_type": "document",
                            "status": 200, "same_origin": True, "provider": None})

    # Deep-discovery URLs go through the exact same gates as graph entries.
    extra_urls = []
    if args.extra_urls:
        with open(args.extra_urls) as f:
            for line in f:
                u = line.strip()
                if not u or u.startswith("#"):
                    continue
                extra_urls.append(u)
        seen = {r.get("url") for r in requests}
        for u in extra_urls:
            if u in seen:
                continue
            host = urlparse(u).netloc
            requests.append({"url": u, "resource_type": "extra-url", "status": 200,
                             "same_origin": host == page_host,
                             "provider": provider_for(host)})

    for r in requests:
        url = r.get("url", "")
        host = urlparse(url).netloc.lower()
        rtype = r.get("resource_type", "")
        status = r.get("status", 0)
        if rtype in SKIP_TYPES or not url.startswith(("http://", "https://")):
            skipped_other.append({"url": url, "reason": "non-asset request type"})
            continue
        if not (200 <= int(status or 0) < 300 or status in (0, None)):
            skipped_other.append({"url": url, "reason": "non-2xx at capture time (%s)" % status})
            continue
        if r.get("provider"):
            # Openly licensed font hosts may be localized, but only when the
            # user explicitly allowed the host (licensing confirmed). Paid and
            # streamed providers are never downloadable, even with --allow-host.
            if not (host in OPEN_LICENSE_FONT_HOSTS and host in allow):
                skipped_provider.append({"url": url, "provider": r["provider"],
                                         "action": "classify: Embed / Kept External / User-Supplied / Recreated From Observation / Blocked"})
                continue
        if r.get("same_origin") or host == page_host or host in allow:
            target = local_path_for(url, out_dir)
            if target is None:
                skipped_other.append({"url": url, "reason": "unsafe path mapping"})
            else:
                to_download.append((url, target))
        else:
            skipped_external.append({"url": url, "host": host,
                                     "action": "classify: Embed / Kept External / User-Supplied / Recreated From Observation / Blocked"})

    downloaded, failed = [], []
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {pool.submit(download, url, target, args.timeout, args.delay): (url, target)
                   for url, target in to_download}
        for fut in as_completed(futures):
            url, target = futures[fut]
            try:
                size = fut.result()
                downloaded.append({"url": url, "path": os.path.relpath(target, out_dir), "bytes": size})
                print("  ok  %s" % url)
            except Exception as e:
                failed.append({"url": url, "error": str(e)})
                print("  FAIL %s (%s)" % (url, e))

    extra_outcomes = []
    if extra_urls:
        outcome = {}
        for d in downloaded:
            outcome[d["url"]] = "downloaded"
        for fl in failed:
            outcome[fl["url"]] = "failed: " + fl["error"]
        for s in skipped_external:
            outcome.setdefault(s["url"], "skipped_external (classify)")
        for s in skipped_provider:
            outcome.setdefault(s["url"], "skipped_provider (never auto-downloaded)")
        for s in skipped_other:
            outcome.setdefault(s["url"], "skipped: " + s["reason"])
        extra_outcomes = [{"url": u, "outcome": outcome.get(u, "unknown")}
                          for u in extra_urls]

    manifest = {
        "page": page_url,
        "mirrored_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "authorization_context": args.authorized.strip(),
        "allowed_external_hosts": sorted(allow),
        "summary": {
            "downloaded": len(downloaded),
            "failed": len(failed),
            "skipped_external": len(skipped_external),
            "skipped_provider_assets": len(skipped_provider),
            "skipped_other": len(skipped_other),
            "extra_urls": len(extra_urls),
        },
        "extra_urls": extra_outcomes,
        "downloaded": sorted(downloaded, key=lambda d: d["path"]),
        "failed": failed,
        "skipped_external": skipped_external,
        "skipped_provider_assets": skipped_provider,
        "skipped_other": skipped_other,
    }
    manifest_path = os.path.join(out_dir, "mirror-manifest.json")
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)

    print("\nMirror: %s" % out_dir)
    print("Manifest: %s" % manifest_path)
    print("  downloaded: %d   failed: %d" % (len(downloaded), len(failed)))
    print("  skipped (external, needs classification): %d" % len(skipped_external))
    print("  skipped (provider-hosted, never auto-downloaded): %d" % len(skipped_provider))
    if extra_urls:
        print("  extra-urls processed: %d (outcomes in manifest 'extra_urls')" % len(extra_urls))
    print("\nNext: python serve.py %s   then validate with viewports.py against the live source." % args.out)
    print("Feed 'skipped' lists into the Asset Preservation Table — every entry needs a status.")


if __name__ == "__main__":
    main()
