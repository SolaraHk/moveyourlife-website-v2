#!/usr/bin/env python3
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys

ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"

class SafeStaticHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".js": "application/javascript",
        ".mjs": "application/javascript",
        ".css": "text/css",
        ".svg": "image/svg+xml",
        ".webp": "image/webp",
    }

    def _path_only(self):
        return unquote(urlsplit(self.path).path)

    def _is_forbidden_path(self):
        parts = [part for part in self._path_only().split("/") if part]
        return any(part.startswith(".") and part != ".well-known" for part in parts)

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        if self.path.startswith("/assets/"):
            self.send_header("Cache-Control", "public, max-age=3600")
        else:
            self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

    def do_GET(self):
        if self._is_forbidden_path():
            self.send_error(404, "Not found")
            return
        super().do_GET()

    def do_HEAD(self):
        if self._is_forbidden_path():
            self.send_error(404, "Not found")
            return
        super().do_HEAD()


def main():
    if not DIST.exists():
        raise SystemExit(f"Missing build directory: {DIST}. Run npm run build first.")
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8123
    handler = partial(SafeStaticHandler, directory=str(DIST))
    server = ThreadingHTTPServer(("127.0.0.1", port), handler)
    print(f"Move Your Life static server on http://127.0.0.1:{port}/ serving {DIST}", flush=True)
    server.serve_forever()

if __name__ == "__main__":
    main()
