FROM nginxinc/nginx-unprivileged:1-alpine

USER root

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY ./uwsgi_params /etc/nginx/uwsgi_params

RUN mkdir -p /vol/static && \
    chmod 755 /vol/static

VOLUME /vol/static