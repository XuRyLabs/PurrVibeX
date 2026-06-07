#!/bin/bash
# ============================================================
# deploy.sh — Deploy MeowWorld lên server (chạy trên VPS)
# ============================================================
set -e

echo "🐱 MeowWorld Deploy Script"
echo "=========================="

# 1. Pull code mới nhất
echo "📥 Pulling latest code..."
git pull origin main

# 2. Copy .env nếu chưa có
if [ ! -f backend/.env ]; then
  echo "⚠️  backend/.env không tìm thấy!"
  echo "    Copy từ .env.production.example và điền thông tin vào."
  exit 1
fi

# 3. Generate APP_KEY nếu chưa có
if grep -q "^APP_KEY=$" backend/.env; then
  echo "🔑 Generating APP_KEY..."
  docker compose -f docker-compose.prod.yml run --rm backend php artisan key:generate --force
fi

# 4. Build & restart containers
echo "🐳 Building Docker images..."
docker compose -f docker-compose.prod.yml build --no-cache

echo "🚀 Starting services..."
docker compose -f docker-compose.prod.yml up -d

# 5. Chờ DB sẵn sàng
echo "⏳ Waiting for database..."
sleep 5

# 6. Migrate
echo "🗄️  Running migrations..."
docker compose -f docker-compose.prod.yml exec backend php artisan migrate --force

# 7. Clear cache
echo "🧹 Clearing caches..."
docker compose -f docker-compose.prod.yml exec backend php artisan config:cache
docker compose -f docker-compose.prod.yml exec backend php artisan route:cache
docker compose -f docker-compose.prod.yml exec backend php artisan view:cache

echo ""
echo "✅ Deploy xong! Services đang chạy:"
docker compose -f docker-compose.prod.yml ps

