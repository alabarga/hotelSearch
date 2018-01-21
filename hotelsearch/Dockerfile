# hackatrips2018team13/hotelsearch:1.0.0 Dockerfile (generated at Sun Jan 21 02:21:10 CET 2018 by Jose San Leandro)
FROM hackatrips2018team13/base:0.9.22
LABEL MAINTAINER="Jose San Leandro <jose.sanleandro@osoco.es>"

# v addon-toggles
## Default values, can be overridden with -e ENABLE_[CRON|MONIT|RSNAPSHOT|SSH|SYSLOG|LOGSTASH|LOCAL_SMTP]=[true|false]
# when launching the container
ENV ENABLE_CRON=true \
    ENABLE_MONIT=true \
    ENABLE_RSNAPSHOT=true \
    ENABLE_SSH=false \
    ENABLE_SYSLOG=true \
    ENABLE_LOCAL_SMTP=true \
    ENABLE_LOGSTASH=true

RUN if [ "false" == "false" ]; then mkdir -p /etc/service/sshd; touch /etc/service/sshd/down; fi
# ^ addon-toggles


ENV DOBACKUP="true" \
    GOPATH="/opt/hotelSearch"

# v service_user template
ENV SERVICE_USER=hotelsearch \
    SERVICE_GROUP=hotelsearch \
    SERVICE_USER_SHELL=/bin/bash \
    SERVICE_USER_HOME=/opt/hotelSearch

RUN (/usr/sbin/groupadd hotelsearch || echo -n "") && \
    (mkdir -p $(dirname /opt/hotelSearch) || echo -n "") && \
    (/usr/sbin/useradd -m -g hotelsearch -G hotelsearch -d /opt/hotelSearch -s /bin/bash -c "hotelsearch user" hotelsearch || echo -n "") && \
    (echo "hotelsearch:secret" | chpasswd || echo -n "")
# ^ service_user template
# v nodejs
# From https://github.com/nodejs/node-v0.x-archive/wiki/Installing-Node.js-via-package-manager#debian-and-ubuntu-based-linux-distributions
RUN curl --silent --location https://deb.nodesource.com/setup_7.x | bash - && \
    /usr/local/bin/aptget-install.sh -vv  -u nodejs build-essential libfontconfig1 && \
    /usr/local/bin/aptget-cleanup.sh -v 
ENV NODE_PATH=./lib
# ^ nodejs
# v npm
RUN AUX="inherits uncss json5 eslint gh-pages mountebank jest babel-cli" && if [ -n "${AUX}" ]; then \
      for p in ${AUX}; do \
        npm install -g ${p}; \
      done; \
    fi
# ^ npm
# v git
COPY git-files/gitconfig /opt/hotelSearch/.gitconfig
RUN /usr/local/bin/aptget-install.sh -vv  git && /usr/local/bin/aptget-cleanup.sh -v  && \
    su - hotelsearch -c 'git config --global user.email "jose.sanleandro@osoco.es"' && \
    su - hotelsearch -c 'git config --global user.name "Jose San Leandro"'
# ^ git
# v apache
ENV SERVICE_PACKAGE="apache2"

RUN /usr/local/bin/aptget-install.sh -vv  --update ${SERVICE_PACKAGE} && \
    /usr/local/bin/aptget-cleanup.sh -v  && \
    mkdir -p /var/run/apache2 /var/lock/apache2 && \
    chown www-data:www-data /var/run/apache2 /var/lock/apache2 && \
    cd /usr/local/bin && \
    ln -sf check-version.sh check-version-apache.sh && \
    ln -sf local-ubuntu-version.sh local-version-apache.sh && \
    ln -sf remote-ubuntu-version.sh remote-version-apache.sh
    
#COPY apache-files/logstash.conf /etc/logstash/conf.d/apache.conf
# ^ apache

RUN cd /opt && \
    git clone https://github.com/hackatrips2018-team13/hotelSearch.git work && \
    rm -rf hotelSearch && \
    rm -rf /var/www/html && \
    mv /opt/work/html_v.3.0 /var/www/html && \
    rm -rf work && \
    mkdir /etc/service/apache

COPY apache-files/service /etc/service/apache/run

RUN chmod +x /etc/service/apache/run

EXPOSE 80

# v copy-metadata
COPY README /
COPY copyright-preamble.txt /copyright.txt
COPY LICENSE /LICENSE
COPY Dockerfile /Dockerfiles/Dockerfile
COPY Dockerfile /Dockerfiles/hackatrips2018team13-hotelsearch.1.0.0
# ^ copy-metadata
# v symlinks
RUN (chmod +x /usr/local/bin/* > /dev/null 2>&1 || true) && \
    (chmod -x /usr/local/bin/*.inc.sh > /dev/null 2>&1 || true) && \
    (chmod +x /etc/my_init.d/* > /dev/null 2>&1 || true) && \
    (chmod -x /etc/my_init.d/*.inc.sh > /dev/null 2>&1 || true) && \
    (chmod +x /sbin/my_exec > /dev/null 2>&1 || true) && \
    (chmod +x /etc/cron.daily/* > /dev/null 2>&1 || true) && \
    (chmod +x /etc/cron.weekly/* > /dev/null 2>&1 || true) && \
    (chmod +x /etc/cron.monthly/* > /dev/null 2>&1 || true) && \
    (for s in /etc/service/*; do \
      if [ ! -e "${s}/.disabled" ]; then \
        chmod +x "${s}/run" > /dev/null 2>&1; \
      fi; \
    done || true) && \
    (for p in /usr/local/bin/*.sh; do \
      if [ "${p%.inc.sh}" == "${p}" ]; then ln -sf $p $(dirname $p)/$(basename $p .sh); fi; \
    done || true) && \
    (ln -sf /Dockerfiles/hackatrips2018team13-hotelsearch.1.0.0 /Dockerfiles/Dockerfile || true)
# ^ symlinks# v instructions

# For instructions on how to use this image, please run
# docker run -it hackatrips2018team13/hotelsearch:1.0.0 help

# Environment variables used when building this image:
ENV SQ_AUTHOR_FIRSTNAME="John" \
    SQ_AUTHOR_LASTNAME="Smith" \
    SQ_AUTHOR="Jose San Leandro" \
    SQ_DOMAIN="hackatrips2018team13.org" \
    SQ_AUTHOR_EMAIL="jose.sanleandro@osoco.es" \
    SQ_NAMESPACE="hackatrips2018team13" \
    SQ_DATE="201801" \
    SQ_TIME="Sun Jan 21 02:21:10 CET 2018" \
    SQ_ROOT_IMAGE_VERSION="0.9.22" \
    SQ_ROOT_IMAGE="phusion/baseimage" \
    SQ_ROOT_IMAGE_64BIT="phusion/baseimage" \
    SQ_RANDOM_PASSWORD="secret" \
    SQ_ROOT_IMAGE_32BIT="32" \
    SQ_BASE_IMAGE_64BIT="hackatrips2018team13/base" \
    SQ_BASE_IMAGE_32BIT="32" \
    SQ_REGISTRY="hub.docker.io" \
    SQ_REGISTRY_NAMESPACE="hackatrips2018team13" \
    SQ_PUSH_TO_DOCKERHUB="false" \
    SQ_JAVA_VERSION="8" \
    SQ_APTGET_INSTALL="/usr/local/bin/aptget-install.sh -vv " \
    SQ_APTGET_CLEANUP="/usr/local/bin/aptget-cleanup.sh -v " \
    SQ_SMTP_HOST="mail.hackatrips2018team13.org" \
    SQ_LDAP_HOST="ldap.hackatrips2018team13.org" \
    SQ_BACKUP_HOST_SUFFIX="-backup.hackatrips2018team13.org" \
    SQ_BACKUP_USER="backup" \
    SQ_SSHPORTS_FILE="sshports.txt" \
    SQ_CUSTOM_BACKUP_SCRIPTS_FOLDER="/usr/local/bin" \
    SQ_CUSTOM_BACKUP_SCRIPTS_PREFIX="backup-" \
    SQ_BACKUP_GROUP="backup" \
    SQ_MONIT_HTTP_PORT="2812" \
    SQ_MONIT_HTTP_USER="monit" \
    SQ_MONIT_HTTP_PASSWORD="oMZ1XXbk5BvojhGC0F8J8R5Gm9psPCPwGejgGu1zZArCfUvB4bMkttcOyHNX" \
    SQ_MONIT_HTTP_TIMEOUT="15 seconds" \
    SQ_MONIT_ALERT_EMAIL="jose.sanleandro@osoco.es" \
    SQ_INCLUDES_FOLDER="./.templates" \
    SQ_COPYRIGHT_PREAMBLE_FILE="copyright-preamble" \
    SQ_LICENSE_FILE="LICENSE" \
    SQ_BUILDER="Jose San Leandro" \
    SQ_SSL_KEY_ENCRYPTION="des3" \
    SQ_SSL_KEY_ALGORITHM="rsa" \
    SQ_SSL_KEY_LENGTH="2048" \
    SQ_SSL_KEY_FOLDER="/etc/ssl/private" \
    SQ_SSL_KEY_PASSWORD="K8emqG04hZKlOUY3rET1ZBChtqFuERxyWAtyVtnVrP1MYMXhA8SPhdBJ" \
    SQ_SSL_CERTIFICATE_ORGANIZATIONAL_UNIT="IT" \
    SQ_SSL_CERTIFICATE_ORGANIZATION="hackatrips2018team13.org" \
    SQ_SSL_CERTIFICATE_ALIAS="hotelsearch" \
    SQ_SSL_CERTIFICATE_SUBJECT="/cn=hackatrips2018team13.org" \
    SQ_SSL_CERTIFICATE_LOCALITY="Madrid" \
    SQ_SSL_CERTIFICATE_STATE="Madrid" \
    SQ_SSL_CERTIFICATE_COUNTRY="ES" \
    SQ_SSL_CERTIFICATE_EXPIRATION_DAYS="3650" \
    SQ_SSL_KEYSTORE_PASSWORD="nmGEQlbT2qnCrBsfQDGFkygj8exgEmTCvmc1KSQ8VebBh5" \
    SQ_SSL_KEYSTORE_FOLDER="/etc/ssl/private" \
    SQ_SSL_KEYSTORE_TYPE="jks" \
    SQ_SSL_JAVA_SIGN_ALGORITHM="SHA256withRSA" \
    SQ_HOST_VOLUMES_ROOT_FOLDER="/var/lib/docker/data" \
    SQ_DEVELOPMENT_USER_ID="1000" \
    SQ_BACKUP_HOST="backup.hackatrips2018team13.org" \
    SQ_GIT_USER_NAME="Jose San Leandro" \
    SQ_GIT_USER_EMAIL="jose.sanleandro@osoco.es" \
    SQ_PARENT_IMAGE_TAG="0.9.22" \
    SQ_TAG="1.0.0" \
    SQ_SERVICE_USER="hotelsearch" \
    SQ_SERVICE_USER_PASSWORD="secret" \
    SQ_SERVICE_GROUP="hotelsearch" \
    SQ_SERVICE_USER_SHELL="/bin/bash" \
    SQ_SERVICE_USER_HOME="/opt/hotelSearch" \
    SQ_IMAGE="hotelsearch" \
    SQ_NODEJS_MAJOR_VERSION="7" \
    SQ_NODEJS_DOWNLOAD_URL="https://deb.nodesource.com/setup_7.x" \
    SQ_NODEJS_MODULES="inherits uncss json5 eslint gh-pages mountebank jest babel" \
    SQ_NPM_MODULES="inherits uncss json5 eslint gh-pages mountebank jest babel-cli" \
    SQ_APACHE_SERVICE_PACKAGE="apache2" \
    SQ_APACHE_SERVICE_USER="www-data" \
    SQ_APACHE_SERVICE_GROUP="www-data" \
    SQ_IMAGE="hotelsearch" \
    SQ_TAG="1.0.0" \
    SQ_DATE="201801" \
    SQ_TIME="Sun Jan 21 02:21:10 CET 2018" \
    SQ_MAINTAINER="" \
    SQ_AUTHOR="Jose San Leandro" \
    SQ_AUTHOR_EMAIL="jose.sanleandro@osoco.es" \
    SQ_STACK="" \
    SQ_ROOT_IMAGE="phusion/baseimage" \
    SQ_BASE_IMAGE="hackatrips2018team13/base" \
    SQ_STACK_SUFFIX="" \
    SQ_NAMESPACE="hackatrips2018team13" \
    SQ_BACKUP_HOST_SSH_PORT=""

# v symlink-envvars
RUN for e in $(set | grep -e '^SQ_' | cut -d'=' -f 1 | sort | uniq); do \
      ln -sf /usr/local/bin/envvar.sh /usr/local/bin/${e#SQ_}; \
    done
# ^ symlink-envvars# ^ instructions
