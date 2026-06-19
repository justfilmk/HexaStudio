#!/bin/sh
set -e

echo "Waiting for MinIO..."
until mc alias set local http://minio:9000 "${MINIO_ROOT_USER}" "${MINIO_ROOT_PASSWORD}"; do
  sleep 2
done

echo "Creating buckets..."
for bucket in uploads models textures videos hdr backups; do
  mc mb --ignore-existing "local/${bucket}"
  mc anonymous set download "local/${bucket}" 2>/dev/null || true
done

echo "MinIO buckets ready."
