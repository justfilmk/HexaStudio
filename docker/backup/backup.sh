#!/bin/sh
set -e

BACKUP_DIR="${BACKUP_DIR:-/backups}"
PG_HOST="${POSTGRES_HOST:-postgres}"
PG_USER="${POSTGRES_USER:-hexastudio}"
PG_PASS="${POSTGRES_PASSWORD}"
PG_DB="${POSTGRES_DB:-hexastudio}"
MINIO_AK="${MINIO_ACCESS_KEY:-hexastudio}"
MINIO_SK="${MINIO_SECRET_KEY}"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

mkdir -p "${BACKUP_DIR}"

echo "[$(date)] Starting pg_dump for ${PG_DB}..."
export PGPASSWORD="${PG_PASS}"
pg_dump -h "${PG_HOST}" -U "${PG_USER}" -d "${PG_DB}" -Fc \
  -f "${BACKUP_DIR}/hexastudio_api_${TIMESTAMP}.dump"

pg_dump -h "${PG_HOST}" -U "${PG_USER}" -d hexastudio_cms -Fc \
  -f "${BACKUP_DIR}/hexastudio_cms_${TIMESTAMP}.dump"

echo "[$(date)] Pruning backups older than 30 days..."
find "${BACKUP_DIR}" -name "*.dump" -mtime +30 -delete

echo "[$(date)] Backup complete."
