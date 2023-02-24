#!/bin/bash

git pull

docker exec api npm install

docker compose -f ./docker-compose.dev-server.yml restart api