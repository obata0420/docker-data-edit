FROM node:18-alpine3.14 as node
FROM nginx:1.22-alpine
SHELL [ "/bin/ash", "-ouex", "pipefail", "-c" ]

WORKDIR /var/www/html

ENV TZ=Asia/Tokyo

RUN apk update && \
    apk add --update --no-cache --virtual=.build-dependencies g++
# node command
COPY --from=node /usr/local/bin /usr/local/bin
# npm command
COPY --from=node /usr/local/lib /usr/local/lib
# yarn command
COPY --from=node /opt /opt

COPY ./docker/nginx/*.conf /etc/nginx/conf.d/