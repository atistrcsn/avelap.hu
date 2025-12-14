#!/bin/sh

cd "$(dirname "$0")"

mkdir -p "backup"

docker exec pg-temp-db pg_dump \
  --username=postgres \
  --dbname "strapi" \
  --verbose --format=c --clean > backup/db.backup
