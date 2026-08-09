#!/usr/bin/env python3
"""Minimal static file server with SPA fallback, for previewing local mirrors.

Same-site routes that don't map to a real file fall back to index.html so
client-side routers resolve. Asset requests (anything with a non-.html
extension) still 404 honestly so missing assets are visible, not masked.

Usage:
    python serve.py [directory] [--port 8000] [--no-spa]

Requires: Python 3 standard library only.
"""

import argparse
import os
import posixpath
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class SPAHandler(SimpleHTTPRequestHandler):
    spa_enabled = True

    def do_GET(self):
        if self.spa_enabled:
            local_path = self.translate_path(self.path)
            clean = self.path.split("?", 1)[0].split("#", 1)[0]
            _, ext = posixpath.splitext(clean)
            # Fall back only for extensionless or .html routes that don't exist.
            if not os.path.exists(local_path) and ext in ("", ".html"):
                index = os.path.join(self.directory, "index.html")
                if os.path.isfile(index):
                    self.log_message("SPA fallback: %s -> /index.html", clean)
                    self.path = "/index.html"
        super().do_GET()

    def end_headers(self):
        # Avoid stale caching while comparing mirror vs. live source.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("directory", nargs="?", default=".", help="mirror root (default: current dir)")
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--no-spa", action="store_true", help="disable index.html fallback")
    args = parser.parse_args()

    directory = os.path.abspath(args.directory)
    if not os.path.isdir(directory):
        raise SystemExit(f"Not a directory: {directory}")

    handler = partial(SPAHandler, directory=directory)
    SPAHandler.spa_enabled = not args.no_spa

    with ThreadingHTTPServer(("127.0.0.1", args.port), handler) as httpd:
        mode = "SPA fallback ON" if SPAHandler.spa_enabled else "plain static"
        print(f"Serving {directory} at http://127.0.0.1:{args.port} ({mode}) — Ctrl+C to stop")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")


if __name__ == "__main__":
    main()
