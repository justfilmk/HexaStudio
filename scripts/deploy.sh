#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# HexaStudio Production Deploy Script
# Run ONCE on a fresh Ubuntu 24.04 server to set up the full stack.
# Subsequent deploys happen via GitHub Actions CI/CD.
# =============================================================================

REPO_URL="https://github.com/justfilmk/HexaStudio.git"
DEPLOY_DIR="/opt/hexastudio"

echo "==> Updating system packages..."
apt-get update && apt-get upgrade -y

echo "==> Installing Docker..."
if ! command -v docker &>/dev/null; then
  curl -fsSL https://get.docker.com | sh
  usermod -aG docker "$SUDO_USER"
  systemctl enable docker
fi

echo "==> Cloning repository..."
install -d -o "$SUDO_USER" -g "$SUDO_USER" "$(dirname "$DEPLOY_DIR")"
if [ ! -d "$DEPLOY_DIR" ]; then
  git clone "$REPO_URL" "$DEPLOY_DIR"
  chown -R "$SUDO_USER":"$SUDO_USER" "$DEPLOY_DIR"
fi

cd "$DEPLOY_DIR"

echo "==> Setting up production env..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo ">>> EDIT .env with your production secrets, then re-run this script."
  exit 1
fi

echo "==> Starting stack..."
docker compose pull
docker compose up -d --build --remove-orphans

echo "==> Deploy complete."
echo "    Frontend: https://hexastudio.net"
echo "    API:      https://api.hexastudio.net/api"
echo "    Swagger:  https://api.hexastudio.net/api/docs"
echo "    CMS:      https://cms.hexastudio.net/admin"
echo "    Grafana:  https://monitor.hexastudio.net"
echo "    Storage:  https://storage.hexastudio.net"
