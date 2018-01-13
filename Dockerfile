FROM php:7.1.2-apache

#RUN docker-php-ext-install pdo mysql
#RUN docker-php-ext-install pdo mysqli

RUN docker-php-ext-install pdo pdo_mysql mysqli

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" &&\
    php -r "if (hash_file('SHA384', 'composer-setup.php') === '544e09ee996cdf60ece3804abc52599c22b1f40f4323403c44d44fdfdd586475ca9813a858088ffbc1f233e9b180f061') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" &&\
    php composer-setup.php &&\
    php -r "unlink('composer-setup.php');" &&\
    mv composer.phar /usr/local/bin/composer

COPY ./composer.json /var/www/html

RUN apt-get update && apt-get install -y git

RUN pecl install pdo_sqlsrv

#RUN mkdir -p /tmp/sqlsrv
#RUN curl -o /tmp/sqlsrv/Ubuntu16.tar -sSL https://github.com/Microsoft/msphpsql/releases/download/v4.3.0/Ubuntu16-7.0.tar
#RUN cd /tmp/sqlsrv ; tar -xf /tmp/sqlsrv/Ubuntu16.tar
#RUN cp /tmp/sqlsrv/*.so /usr/lib/php/20151012/
#RUN echo "; priority=20" >> /etc/php/7.1/mods-available/pdo_sqlsrv.ini
#RUN echo "extension=php_pdo_sqlsrv_7_nts.so" >> /etc/php/7.1/mods-available/pdo_sqlsrv.ini
#RUN echo "extension=php_sqlsrv_7_nts.so" >> /etc/php/7.1/mods-available/pdo_sqlsrv.ini
#RUN phpenmod pdo_sqlsrv
#RUN rm -fr /tmp/sqlsrv

RUN composer install

RUN sed -i 's/DocumentRoot.*$/DocumentRoot \/var\/www\/html\/public/' /etc/apache2/sites-enabled/000-default.conf

RUN a2enmod rewrite

