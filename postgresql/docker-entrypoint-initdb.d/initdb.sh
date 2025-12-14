#!/bin/bash
set -e

FILE=/backup

if [[ -f "$FILE" ]]; then
  dropdb --username "$POSTGRES_USER" --no-password --if-exists "$POSTGRES_DB"
  createdb --username "$POSTGRES_USER" --no-password "$POSTGRES_DB"
  pg_restore --username "$POSTGRES_USER" --no-password --dbname "$POSTGRES_DB" --verbose --schema "public" <${FILE}
fi
