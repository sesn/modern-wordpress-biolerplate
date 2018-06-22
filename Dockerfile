FROM wordpress:4.9.6-php7.0-apache
LABEL vendor="SESN" \
      description="modern wordpress biolerplate" \
      version="1.0.0"

# RUN apt-get update && apt-get install -y \
#         libicu-dev \
#         libmcrypt-dev \
#         libmagickwand-dev \
#         libsodium-dev \
#         libtidy-dev \
#         --no-install-recommends && rm -r /var/lib/apt/lists/* \
#     && pecl install redis-3.1.1 imagick-3.4.3 libsodium-1.0.6 \
#     && docker-php-ext-enable redis imagick libsodium \
#     && docker-php-ext-install -j$(nproc) exif gettext intl mcrypt sockets zip \
#     && docker-php-ext-install tidy

# Cleanup
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
