#!/bin/sh

git pull
sudo tar -xzvf ./client/build.tar.gz -C ./client/
docker exec frontend nginx -s reload