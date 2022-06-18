FROM node:alpine

WORKDIR /client

ENV PATH /client/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent
RUN npm install react-script -g --silent

COPY . ./

# 개발용
CMD ["npm", "start"]

# 배포용
# CMD [ "npm", "run", "build" ]
