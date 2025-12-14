#!/usr/bin/env bash

cd "$(dirname "$0")"

function shutdown() {
        echo 'Stopping down and removing postgres ...'
        # stop if running
        docker compose down

        exit 0
}
trap 'shutdown' SIGTERM SIGHUP SIGINT EXIT

docker compose up && docker compose logs -f

# Final message
echo
echo "#-----------------------------------------------------------"
echo "#"
echo "# postgres is listening on localhost:5432"
echo "#"
echo "#-----------------------------------------------------------"
echo
