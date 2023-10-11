FROM python:3.11-alpine

ENV PYTHONUNBUFFERED 1

WORKDIR /printer_app

COPY ./backend/requirements.txt .

RUN apk update && \
    apk add --no-cache make netcat-openbsd && \
    rm -rf /var/cache/apk/* && \
    apk add linux-headers && \
    apk add libc-dev && \
    apk add gcc && \
    apk add pcre-dev && \
    pip install --upgrade pip && \
    pip install wheel && \
    pip install -r requirements.txt

COPY ./run.sh .
RUN chmod +x /printer_app/run.sh

COPY . .

ENTRYPOINT ["/bin/sh", "/printer_app/run.sh"]


