#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# HexaStudio Server Hardening (Ubuntu 24.04)
# Run as root on a fresh server BEFORE deploying.
# =============================================================================

echo "==> Configuring automatic security updates..."
cat > /etc/apt/apt.conf.d/20auto-upgrades << 'EOF'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Download-Upgradeable-Packages "1";
APT::Periodic::AutocleanInterval "7";
APT::Periodic::Unattended-Upgrade "1";
EOF

echo "==> Installing Fail2Ban..."
apt-get install -y fail2ban
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = ssh
logpath = %(sshd_log)s
EOF
systemctl enable --now fail2ban

echo "==> Configuring UFW..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "==> Disabling root SSH login..."
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart sshd

echo "==> Setting up weekly cron job for system updates..."
cat > /etc/cron.weekly/hexastudio-updates << 'CRON'
#!/bin/sh
apt-get update && apt-get upgrade -y && apt-get autoremove -y
CRON
chmod +x /etc/cron.weekly/hexastudio-updates

echo "==> Server hardening complete."
