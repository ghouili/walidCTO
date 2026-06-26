#!/usr/bin/env bash
#
# Production release script — run on the server after the code is synced.
# Invoked by .github/workflows/deploy.yml, but also safe to run by hand:
#
#     cd /var/www/walid-ghouili-site && ./deploy.sh
#
# It assumes git and a Node toolchain (system- or nvm-installed) plus pm2 are
# available on the host, and that this repo is checked out at the path below.
set -euo pipefail

# Always operate from the repo root (the directory this script lives in),
# regardless of where it was invoked from.
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

PM2_APP_NAME="${PM2_APP_NAME:-walid-ghouili-site}"
PM2_CONFIG="ecosystem.config.cjs"

log() { printf '\n\033[1;36m▶ %s\033[0m\n' "$1"; }

# 0. Make Node / npm / pm2 reachable.
#    CI runs this over a NON-interactive SSH session, which doesn't source
#    ~/.bashrc or ~/.profile — so an nvm-managed Node (shared with other
#    projects on this box) isn't on PATH. Load nvm if present, then fall back
#    to the usual global bin paths.
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck disable=SC1091
  . "$NVM_DIR/nvm.sh"
  nvm use default > /dev/null 2>&1 || nvm use node > /dev/null 2>&1 || true
fi
export PATH="$PATH:/usr/local/bin:/usr/bin"

if ! command -v npm > /dev/null 2>&1; then
  echo "✗ npm not found. Install Node on the server, or set NVM_DIR if nvm lives elsewhere." >&2
  exit 127
fi
log "Using node $(node -v) · npm $(npm -v)"

# 1. Production environment file.
#    Written fresh each deploy from the base64 secret if it was provided;
#    otherwise we keep whatever .env.production already exists on the server.
if [ -n "${PRODUCTION_ENV_B64:-}" ]; then
  log "Writing .env.production from deploy secret"
  printf '%s' "$PRODUCTION_ENV_B64" | base64 -d > .env.production
fi

# 2. Dependencies — clean, lockfile-exact install.
log "Installing dependencies (npm ci)"
npm ci

# 3. Build the Next.js app.
log "Building (npm run build)"
npm run build

# 4. Release with PM2 — zero-downtime reload if already running, else start.
mkdir -p logs
log "Releasing with PM2 ($PM2_APP_NAME)"
if pm2 describe "$PM2_APP_NAME" > /dev/null 2>&1; then
  pm2 reload "$PM2_CONFIG" --update-env
else
  pm2 start "$PM2_CONFIG"
fi

# Persist the process list so it survives a server reboot
# (requires `pm2 startup` to have been run once on the host).
pm2 save

log "Deploy complete ✓"
