#!/usr/bin/env bash
# Generates production-ready secrets and writes to .env.production
set -euo pipefail

OUTPUT=".env.production"
cp .env.example "$OUTPUT"

generate() { openssl rand -hex 32; }
generate_strapi_key() { openssl rand -base64 32; }

POSTGRES_PW=$(generate)
REDIS_PW=$(generate)
MINIO_PW=$(generate)
JWT_SECRET=$(generate)
STRAPI_KEYS=$(generate_strapi_key),$(generate_strapi_key),$(generate_strapi_key),$(generate_strapi_key)
STRAPI_TOKEN_SALT=$(generate)
STRAPI_ADMIN_JWT=$(generate)
STRAPI_TRANSFER_SALT=$(generate)
GRAFANA_PW=$(generate)

sed -i "s/POSTGRES_PASSWORD=change_me_postgres_password/POSTGRES_PASSWORD=$POSTGRES_PW/" "$OUTPUT"
sed -i "s/REDIS_PASSWORD=change_me_redis_password/REDIS_PASSWORD=$REDIS_PW/" "$OUTPUT"
sed -i "s/MINIO_ROOT_PASSWORD=change_me_minio_password/MINIO_ROOT_PASSWORD=$MINIO_PW/" "$OUTPUT"
sed -i "s/JWT_SECRET=change_me_jwt_secret_min_32_chars/JWT_SECRET=$JWT_SECRET/" "$OUTPUT"
sed -i "s/STRAPI_APP_KEYS=key1,key2,key3,key4/STRAPI_APP_KEYS=$STRAPI_KEYS/" "$OUTPUT"
sed -i "s/STRAPI_API_TOKEN_SALT=change_me_api_token_salt/STRAPI_API_TOKEN_SALT=$STRAPI_TOKEN_SALT/" "$OUTPUT"
sed -i "s/STRAPI_ADMIN_JWT_SECRET=change_me_admin_jwt_secret/STRAPI_ADMIN_JWT_SECRET=$STRAPI_ADMIN_JWT/" "$OUTPUT"
sed -i "s/STRAPI_TRANSFER_TOKEN_SALT=change_me_transfer_token_salt/STRAPI_TRANSFER_TOKEN_SALT=$STRAPI_TRANSFER_SALT/" "$OUTPUT"
sed -i "s/STRAPI_JWT_SECRET=change_me_strapi_jwt_secret/STRAPI_JWT_SECRET=$(generate)/" "$OUTPUT"
sed -i "s/GRAFANA_ADMIN_PASSWORD=change_me_grafana_password/GRAFANA_ADMIN_PASSWORD=$GRAFANA_PW/" "$OUTPUT"

echo "Secrets written to $OUTPUT"
echo "Run: scp $OUTPUT $SERVER:/opt/hexastudio/.env"
