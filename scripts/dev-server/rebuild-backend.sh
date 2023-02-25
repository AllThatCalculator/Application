#!/bin/bash

git pull

RUNNING_APPLICATION=$(docker ps | grep api_blue)
DEFAULT_CONF="./nginx/nginx.dev-server/nginx.conf"

##### BLUE RUNNING...
if [ -n "$RUNNING_APPLICATION"  ];then
  CONTAINER_A="api_green"
  CONTAINER_B="api_blue"
else
  CONTAINER_A="api_blue"
  CONTAINER_B="api_green"
fi

# Start container A and stop container B
echo "Deploy $CONTAINER_A..."
docker compose -f ./docker-compose.dev-server.yml build $CONTAINER_A
docker compose -f ./docker-compose.dev-server.yml up -d $CONTAINER_A

while [ 1 == 1 ]; do
  echo "$CONTAINER_A health check...."
  REQUEST=$(docker exec nginx curl http://$CONTAINER_A:5000)
  echo $REQUEST
  if [ -n "$REQUEST" ]; then
    break ;
  fi
  sleep 3
done;

sed -i "s/$CONTAINER_B/$CONTAINER_A/g" $DEFAULT_CONF
docker exec frontend nginx -s reload
docker compose -f ./docker-compose.dev-server.yml stop $CONTAINER_B