#!/bin/sh

git pull origin develop
sudo tar -xzvf ./client/build.tar.gz -C ./client/
docker exec frontend nginx -s reload