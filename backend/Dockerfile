FROM php:8.3-fpm-alpine

# Install system deps
RUN apk add --no-cache \
    nginx \
    postgresql-client \
    libpq-dev \
    zip \
    unzip \
    git \
    curl \
    nodejs \
    npm

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql opcache bcmath

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy dependency files first (layer caching)
COPY composer.json composer.lock ./

RUN composer install --no-dev --optimize-autoloader --no-scripts --no-interaction

# Copy app
COPY . .

# Run post-install scripts
RUN composer run-script post-autoload-dump

# Storage & cache permissions
RUN mkdir -p storage/logs storage/framework/sessions storage/framework/cache storage/framework/views \
    && chmod -R 775 storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
