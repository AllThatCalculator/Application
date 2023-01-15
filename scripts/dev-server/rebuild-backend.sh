#!/bin/bash

git pull

docker exec backend_dev-server npm install

docker compose -f ./docker-compose.dev-server.yml restart backend_dev-server