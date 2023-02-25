#!/bin/sh

git pull
cd ./client
sudo tar -xzvf build.tar.gz
docker exec frontend nginx -s reload