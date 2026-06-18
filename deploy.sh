#!/usr/bin/env bash
# Publish moveyourlife-website-v2 to https://myl2.inexadesk.com
# Builds the site and syncs it into the folder the port-4403 static server serves.
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVE_DIR="$HOME/.local/share/sites/myl2-preview"

cd "$PROJECT_DIR"
echo "→ building…"
npx vite build

echo "→ syncing to $SERVE_DIR"
mkdir -p "$SERVE_DIR"
rsync -a --delete dist/ "$SERVE_DIR/"

echo "→ verifying http://127.0.0.1:4403"
title=$(curl -s --max-time 10 http://127.0.0.1:4403/ | grep -oE '<title>[^<]*</title>' || true)
echo "   served: ${title:-<no response — is the 4403 server running?>}"
echo "✓ deployed to https://myl2.inexadesk.com"
