#!/bin/bash

docker system prune -af
# unzip frontend build file
git pull origin production
sudo tar -xzvf ./client/build.tar.gz -C ./client/

IS_BLUE_RUNNING=$(docker ps | grep api_blue)
NGINX_CONFIG_FILE="./nginx/nginx.prod/green-blue.conf"

##### BLUE RUNNING...
if [ -n "$IS_BLUE_RUNNING"  ];then
  CONTAINER_A="api_green" # to deploy
  CONTAINER_B="api_blue"  # to stop
else
  CONTAINER_A="api_blue"
  CONTAINER_B="api_green"
fi

# Start container A
echo "Deploy $CONTAINER_A..."
docker compose -f ./docker-compose.prod.yml build $CONTAINER_A
docker compose -f ./docker-compose.prod.yml up -d $CONTAINER_A

# wait until backend server starts
while [ 1 == 1 ]; do
  echo "$CONTAINER_A health check...."
  REQUEST=$(docker exec frontend curl http://$CONTAINER_A:5000)
  echo $REQUEST
  if [ -n "$REQUEST" ]; then
    break ;
  fi
  sleep 3
done;

# toggle nginx config file
sed -i "s/$CONTAINER_B/$CONTAINER_A/g" $NGINX_CONFIG_FILE
docker exec frontend nginx -s reload

# preserver logs
log_path="./log/$(TZ="Asia/Seoul" date '+%Y-%m-%d-%H-%M')-$CONTAINER_B.out"
docker logs $CONTAINER_B > $log_path

# stop container B
docker compose -f ./docker-compose.prod.yml stop $CONTAINER_B

# clear unusing docker
docker image prune -af
docker system prune -af