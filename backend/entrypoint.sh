#!/bin/sh
# Entrypoint script to handle PORT env variable properly for Laravel Serve

PORT=${PORT:-8000}

# Ensure PORT is numeric
if ! echo "$PORT" | grep -qE '^[0-9]+$'; then
  PORT=8000
fi

exec php artisan serve --host=0.0.0.0 --port=$PORT

