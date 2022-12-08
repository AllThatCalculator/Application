#!/bin/bash

#shell script for ssh port forwarding
mkdir ~/.ssh
ssh-keyscan -H ${SSH_HOST} > ~/.ssh/known_hosts
chmod 400 ${SSH_PEM_KEY}
ssh -fN -4 -i "${SSH_PEM_KEY}" -L ${MYSQL_PORT}:${RDS_HOST}:${MYSQL_PORT} ${SSH_USER}@${SSH_HOST}

npx nodemon -L main.js