#!/bin/bash

git pull
docker compose -f ./docker-compose.dev-server.yml restart backend_dev-server