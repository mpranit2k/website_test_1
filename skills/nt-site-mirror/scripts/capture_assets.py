#!/usr/bin/env python3
"""Capture a page's runtime asset graph: every network response triggered by
initial load and by scrolling, classified same-origin vs. external, with
known media/font providers flagged. Also inventories same-site routes from
anchor hrefs. Output feeds the Discovery report and the Asset Preservation
Table — use it instead of guessing what a page loads.

This script only OBSERVES network traffic. It does not download or save any
asset. Downloading remains a separate, authorization-gated decision per the
core Asset Classification rules.

Usage:
    python capture_assets.py https://example.com [-o asset-graph.json]
        [--scroll-steps 12] [--step-wait 700] [--timeout 45000] [--mobile]

Requires: pip install playwright && playwright install chromium
"""

import argparse
import json
import sys
import time
from urllib.parse import urlparse

KNOWN_PROVIDERS = {
    "vimeo.com": "Vimeo", "player.vimeo.com": "Vimeo", "vimeocdn.com": "Vimeo",
    "youtube.com": "YouTube", "youtu.be": "YouTube", "ytimg.com": "YouTube",
    "googlevideo.com": "YouTube",
    "mux.com": "Mux", "litix.io": "Mux", "stream.mux.com": "Mux",
    # Openly licensed (OFL/Apache, self-hostable): may be localized when the
    # user confirms licensing — pass the host to mirror_assets.py --allow-host.
    # Paid font CDNs below are never auto-downloadable.
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


def provider_for(host):
    host = (host or "").lower()
    for key, name in KNOWN_PROVIDERS.items():
        if host == key or host.endswith("." + key):
            return name
    return None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("url")
    parser.add_argument("-o", "--out", default="asset-graph.json")
    parser.add_argument("--scroll-steps", type=int, default=12)
    parser.add_argument("--step-wait", type=int, default=700, help="ms between scroll steps")
    parser.add_argument("--timeout", type=int, default=45000, help="navigation timeout ms")
    parser.add_argument("--mobile", action="store_true", help="also capture a mobile-viewport pass")
    args = parser.parse_args()

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        sys.exit("playwright not installed. Run: pip install playwright && playwright install chromium")

    origin = urlparse(args.url)
    responses = {}            # url -> record, deduped across passes
    phase = {"value": "init"}  # mutable so the listener sees the current phase

    def on_response(resp):
        try:
            url = resp.url
            if url.startswith("data:") or url in responses:
                return
            host = urlparse(url).netloc
            responses[url] = {
                "url": url,
                "resource_type": resp.request.resource_type,
                "status": resp.status,
                "content_type": (resp.headers or {}).get("content-type", ""),
                "content_length": (resp.headers or {}).get("content-length"),
                "same_origin": host == origin.netloc,
                "provider": provider_for(host),
                "first_seen": phase["value"],
            }
        except Exception:
            pass  # never let bookkeeping kill the capture

    viewports = [("desktop", {"width": 1440, "height": 900})]
    if args.mobile:
        viewports.append(("mobile", {"width": 390, "height": 844}))

    routes = set()
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for vp_name, vp in viewports:
            page = browser.new_page(viewport=vp)
            page.on("response", on_response)

            phase["value"] = vp_name + ":load"
            page.goto(args.url, wait_until="domcontentloaded", timeout=args.timeout)
            try:
                page.wait_for_load_state("networkidle", timeout=15000)
            except Exception:
                pass

            # Scroll pass: triggers lazy loads, IntersectionObservers, late media.
            phase["value"] = vp_name + ":scroll"
            total = page.evaluate(
                "() => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)"
            )
            step = max(1, total // max(1, args.scroll_steps))
            for i in range(1, args.scroll_steps + 1):
                page.evaluate("window.scrollTo(0, %d)" % (i * step))
                page.wait_for_timeout(args.step_wait)
            try:
                page.wait_for_load_state("networkidle", timeout=10000)
            except Exception:
                pass
            page.evaluate("window.scrollTo(0, 0)")
            page.wait_for_timeout(500)

            # Route inventory from same-site anchors.
            hrefs = page.eval_on_selector_all(
                "a[href]", "els => els.map(e => e.getAttribute('href'))"
            )
            for h in hrefs or []:
                if not h:
                    continue
                pu = urlparse(h)
                if pu.scheme in ("mailto", "tel", "javascript"):
                    continue
                if pu.netloc in ("", origin.netloc):
                    routes.add(pu.path or "/")
            page.close()
        browser.close()

    records = sorted(responses.values(), key=lambda r: (not r["same_origin"], r["url"]))
    same = [r for r in records if r["same_origin"]]
    ext = [r for r in records if not r["same_origin"]]
    late = [r for r in records if ":scroll" in r["first_seen"]]
    providers = sorted({r["provider"] for r in ext if r["provider"]})
    by_type = {}
    for r in records:
        by_type[r["resource_type"]] = by_type.get(r["resource_type"], 0) + 1

    report = {
        "page": args.url,
        "captured_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "summary": {
            "total_responses": len(records),
            "same_origin": len(same),
            "external": len(ext),
            "loaded_only_after_scroll": len(late),
            "by_resource_type": by_type,
            "providers_detected": providers,
        },
        "same_site_routes_from_anchors": sorted(routes),
        "requests": records,
    }
    with open(args.out, "w") as f:
        json.dump(report, f, indent=2)

    print("Wrote " + args.out)
    print("  responses: %d (%d same-origin, %d external)" % (len(records), len(same), len(ext)))
    print("  loaded only after scroll: %d" % len(late))
    if providers:
        print("  providers detected (classify, do NOT auto-download): " + ", ".join(providers))
    print("  same-site routes found: %d" % len(routes))


if __name__ == "__main__":
    main()
