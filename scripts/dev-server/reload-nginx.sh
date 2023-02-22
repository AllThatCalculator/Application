#!/bin/sh

git pull
docker exec frontend nginx -s reload