#!/usr/bin/env python3
"""Full-page screenshots at desktop / tablet / mobile for one or more URLs.
Use it on BOTH the local mirror (http://127.0.0.1:8000) and the live source,
then compare the pairs during Validation.

Scrolls the full page first so lazy-loaded content renders before capture,
then returns to top and screenshots.

Usage:
    python viewports.py http://127.0.0.1:8000 https://example.com [--out shots]
        [--viewports desktop,tablet,mobile] [--timeout 45000]

Requires: pip install playwright && playwright install chromium
"""

import argparse
import os
import re
import sys
from urllib.parse import urlparse

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "tablet": {"width": 768, "height": 1024},
    "mobile": {"width": 390, "height": 844},
}


def slug(url):
    pu = urlparse(url)
    base = (pu.netloc + pu.path).strip("/").replace("/", "_") or "page"
    return re.sub(r"[^A-Za-z0-9._-]+", "-", base)[:80]


def settle(page, steps=10, wait_ms=400):
    """Scroll through the page to trigger lazy content, then return to top."""
    total = page.evaluate(
        "() => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)"
    )
    step = max(1, total // steps)
    for i in range(1, steps + 1):
        page.evaluate("window.scrollTo(0, %d)" % (i * step))
        page.wait_for_timeout(wait_ms)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(800)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("urls", nargs="+")
    parser.add_argument("--out", default="shots")
    parser.add_argument("--viewports", default="desktop,tablet,mobile")
    parser.add_argument("--timeout", type=int, default=45000)
    args = parser.parse_args()

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        sys.exit("playwright not installed. Run: pip install playwright && playwright install chromium")

    names = [v.strip() for v in args.viewports.split(",") if v.strip()]
    unknown = [n for n in names if n not in VIEWPORTS]
    if unknown:
        sys.exit("Unknown viewport(s): %s. Valid: %s" % (unknown, ", ".join(VIEWPORTS)))

    os.makedirs(args.out, exist_ok=True)
    written = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for url in args.urls:
            for name in names:
                page = browser.new_page(viewport=VIEWPORTS[name], device_scale_factor=2)
                try:
                    page.goto(url, wait_until="domcontentloaded", timeout=args.timeout)
                    try:
                        page.wait_for_load_state("networkidle", timeout=15000)
                    except Exception:
                        pass
                    settle(page)
                    path = os.path.join(args.out, "%s__%s.png" % (slug(url), name))
                    page.screenshot(path=path, full_page=True)
                    written.append(path)
                    print("Saved " + path)
                except Exception as e:
                    print("FAILED %s @ %s: %s" % (url, name, e))
                finally:
                    page.close()
        browser.close()

    print("\n%d screenshot(s) in %s/" % (len(written), args.out))
    print("Compare local vs. source pairs per viewport during Validation.")


if __name__ == "__main__":
    main()
