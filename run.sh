#!/bin/sh
echo 'Starting postgres...'
while ! nc -z $DB_HOSTNAME $DB_PORT; do
    sleep 0.1
done
echo 'Started'
echo 'Manage.py migrate...'
cd backend
python3 manage.py migrate
exec "$@"