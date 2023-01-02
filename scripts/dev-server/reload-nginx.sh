#!/bin/sh

git pull
docker compose -f ./docker-compose.dev-server.yml restart frontend_dev-server