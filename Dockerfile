FROM wordpress:4.9.6-php7.0-apache
LABEL vendor="SESN" \
      description="modern wordpress biolerplate" \
      version="1.0.0"

RUN apt-get update && apt-get install -y \
        libicu-dev \
        libmcrypt-dev \
        libmagickwand-dev \
        libsodium-dev \
        libtidy-dev \
        --no-install-recommends && rm -r /var/lib/apt/lists/* \
    && pecl install redis-3.1.1 imagick-3.4.3 libsodium-1.0.6 \
    && docker-php-ext-enable redis imagick libsodium \
    && docker-php-ext-install -j$(nproc) exif gettext intl mcrypt sockets zip \
    && docker-php-ext-install tidy

# Add sudo in order to run wp-cli as the
RUN apt-get install -y sudo less

# Adding WP-CLI 
RUN curl -o /bin/wp-cli.phar https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
COPY wp-su.sh /bin/wp
RUN chmod +x /bin/wp-cli.phar /bin/wp

# Cleanup
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*