#!/usr/bin/env bash
# Deploy Il Mondo di Eliana. Lo script vive NEL repo (~/eliana-world).
# Versione derivata da git (tag + commit successivi). version.js generato in automatico.
# Uso:  ./deploy.sh            deploy (versione = git describe)
#       ./deploy.sh vX.Y       crea il tag di release e deploya
set -euo pipefail
cd "$(dirname "$0")"          # = repo root

CADDY="/home/inglele/ai-dashboard/eliana"

git config user.name  inglele >/dev/null 2>&1 || true
git config user.email inglele@users.noreply.github.com >/dev/null 2>&1 || true

# 1. committa eventuali modifiche pendenti PRIMA di taggare (tag pulito, non -dirty)
git add -A
git diff --cached --quiet || git commit -qm "wip"

# 2. tag opzionale di release
if [[ "${1:-}" =~ ^v[0-9] ]]; then
  git tag -a "$1" -m "release $1" && echo "🏷  tagged $1"
fi

# 3. versione da git → version.js
VER="$(git describe --tags --always 2>/dev/null || echo 'v0.0-dev')"
DATE="$(date +%Y-%m-%d)"
cat > lib/version.js <<JS
// GENERATO da deploy.sh — non modificare a mano. Versione da git describe.
window.APP_VERSION = '${VER}';
window.APP_BUILD_DATE = '${DATE}';
JS
echo "📦 lib/version.js → $VER ($DATE)"

# 4. copia su Caddy (deploy live), preservando le sottocartelle
mkdir -p "$CADDY/locales" "$CADDY/lib" "$CADDY/content"
for f in index.html config.js README.md CHANGELOG.md; do cp "$f" "$CADDY/$f"; done
cp lib/*.js     "$CADDY/lib/"
cp content/*.js "$CADDY/content/"
cp locales/*.js "$CADDY/locales/"
echo "🚀 deployato su $CADDY"

# 5. commit del version.js + push
git add -A
if git diff --cached --quiet; then
  echo "✓ repo già aggiornato"
else
  git commit -qm "deploy $VER"
fi
git push -q origin HEAD --tags 2>&1 | tail -1 || true
echo "✓ pushato: $VER"
