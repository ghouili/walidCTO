#!/usr/bin/env bash
# One-shot VPS setup for walidghouili.com. Idempotent, safe to re-run.
#   cd /var/www/walid-ghouili-site && git pull && bash deploy/vps-setup.sh
set -euo pipefail
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

PRIMARY="walidghouili.com"; OLD_HOST="walid.innoviaburst.com"
PM2_APP_NAME="${PM2_APP_NAME:-walid-ghouili-site}"
log() { printf '\n\033[1;36m▶ %s\033[0m\n' "$1"; }
ask() { local v; read -r -p "$1 [$2]: " v </dev/tty; echo "${v:-$2}"; }

log "Code"
git fetch -q origin production && git checkout -q production && git reset -q --hard origin/production
git log --oneline -1

log "Environment (.env.production) — press Enter to keep the current/default value"
cur() { local v; v="$(grep -s "^$1=" .env.production | cut -d= -f2- || true)"; echo "${v:-$2}"; }
RESEND_API_KEY="$(ask 'Resend API key' "$(cur RESEND_API_KEY "")")"
CONTACT_TO="$(ask 'Leads go to' "$(cur CONTACT_TO walid.ghouili@innoviaburst.com)")"
CONTACT_FROM="$(ask 'Sender (domain verified in Resend)' "$(cur CONTACT_FROM "Walid Ghouili <site@walidghouili.com>")")"
GTM_ID="$(ask 'GTM container id' "$(cur NEXT_PUBLIC_GTM_ID "")")"
LE_EMAIL="$(ask "Let's Encrypt email" 'walid.ghouili98@gmail.com')"
cat > .env.production <<ENV
NEXT_PUBLIC_SITE_URL=https://${PRIMARY}
RESEND_API_KEY=${RESEND_API_KEY}
CONTACT_TO=${CONTACT_TO}
CONTACT_FROM=${CONTACT_FROM}
NEXT_PUBLIC_GTM_ID=${GTM_ID}
ENV
chmod 600 .env.production

log "nginx: serve ${PRIMARY} + ${OLD_HOST}, www -> apex"
sudo cp deploy/nginx/walidghouili.com.conf /etc/nginx/sites-available/walidghouili.com
sudo ln -sf /etc/nginx/sites-available/walidghouili.com /etc/nginx/sites-enabled/walidghouili.com
sudo rm -f /etc/nginx/sites-enabled/walid.innoviaburst.com /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

log "Build + PM2"
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"; [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && (nvm use default >/dev/null 2>&1 || true)
npm ci && npm run build && mkdir -p logs
if pm2 describe "$PM2_APP_NAME" >/dev/null 2>&1; then pm2 reload ecosystem.config.cjs --update-env; else pm2 start ecosystem.config.cjs; fi
pm2 save

log "TLS"
command -v certbot >/dev/null || { sudo apt-get update -qq && sudo apt-get install -y -qq certbot python3-certbot-nginx; }
sudo certbot --nginx -n --agree-tos -m "$LE_EMAIL" --redirect -d "$PRIMARY" -d "www.${PRIMARY}" || echo "!! certbot ${PRIMARY} failed: check DNS A record and port 80"
sudo certbot --nginx -n --agree-tos -m "$LE_EMAIL" --expand -d "$PRIMARY" -d "www.${PRIMARY}" -d "$OLD_HOST" \
  || echo "-- ${OLD_HOST} skipped (Cloudflare proxy). OK: set Cloudflare SSL mode to Full."
sudo nginx -t && sudo systemctl reload nginx

log "Smoke test"
for u in "https://${PRIMARY}/" "https://${PRIMARY}/fr" "https://${PRIMARY}/work/sabboura" "https://${PRIMARY}/sitemap.xml" \
         "https://${PRIMARY}/llms.txt" "https://${PRIMARY}/lp/audit-technique" "http://www.${PRIMARY}/" "https://${OLD_HOST}/work/facturra"; do
  printf '%-52s %s\n' "$u" "$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 -L "$u")"
done
curl -s "https://${OLD_HOST}/" | grep -o '<link rel="canonical"[^>]*>' | head -1 || true

log "Done. Still manual:"
cat <<TXT
1. GitHub repo → Settings → Secrets → PRODUCTION_ENV_B64 =
$(base64 -w0 .env.production)
   Variables: APP_DIR=$(pwd)  DEPLOY_BRANCH=production  PM2_APP_NAME=${PM2_APP_NAME}
2. Resend → Domains → add ${PRIMARY}, copy its DNS records to your registrar.
3. Cloudflare zone innoviaburst.com → SSL/TLS → Full.
4. Search Console: add ${PRIMARY}, submit https://${PRIMARY}/sitemap.xml.
TXT
