#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="${ENV_FILE:-.env}"
if [[ -f "$ENV_FILE" ]]; then
  set -a
  source "$ENV_FILE"
  set +a
fi

DB_HOST="${DB_HOST}"
DB_PORT="${DB_PORT}"
DB_USER="${DB_USER}"
DB_PASSWORD="${DB_PASSWORD}"
DB_NAME="${DB_NAME}"
DB_SERVICE="${DB_SERVICE:-db}"
USE_DOCKER="${USE_DOCKER:-true}"

MYSQL_CMD=(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" "$DB_NAME")

if [[ -n "$DB_PASSWORD" ]]; then
  MYSQL_CMD=(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME")
fi

if [[ "$USE_DOCKER" == "true" ]]; then
  MYSQL_CMD=(docker compose exec -T "$DB_SERVICE" "${MYSQL_CMD[@]}")
fi

for file in migrations/create-categories.sql migrations/create-products.sql migrations/create-promotions.sql; do
  echo "Running migration: $file"
  "${MYSQL_CMD[@]}" < "$file"
done

echo "Migrations completed."
