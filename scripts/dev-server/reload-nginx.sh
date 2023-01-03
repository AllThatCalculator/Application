#!/bin/sh

git pull
docker exec frontend_dev-server nginx -s reload