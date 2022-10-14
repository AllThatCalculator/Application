#!/bin/bash
docker-compose down

rm -rf ../client/node_modules
rm -rf ../server/node_modules

rm -rf ../database/mariaDB/data

docker-compose -f ./docker-compose.yml up --build