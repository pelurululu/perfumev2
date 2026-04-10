FROM php:8.2-apache

# Install curl extension (used for ToyyibPay & Brevo API calls)
RUN docker-php-ext-install curl \
    && a2enmod rewrite

# Allow .htaccess overrides
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# Copy project files
COPY . /var/www/html/

# Create log files and set permissions
RUN touch /var/www/html/orders.log /var/www/html/payments.log /var/www/html/debug.log \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    && chmod 666 /var/www/html/orders.log /var/www/html/payments.log /var/www/html/debug.log

# Render assigns a dynamic PORT — Apache must listen on it
# This start script replaces the hardcoded port 80 at runtime
RUN echo '#!/bin/bash\n\
sed -i "s/Listen 80/Listen ${PORT:-80}/" /etc/apache2/ports.conf\n\
sed -i "s/:80>/:${PORT:-80}>/" /etc/apache2/sites-enabled/000-default.conf\n\
apache2-foreground' > /start.sh \
    && chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]
