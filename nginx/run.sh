#!/bin/sh

set -e

envsubst < /etc/nginx/nginx.conf > /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'