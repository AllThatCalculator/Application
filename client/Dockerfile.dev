FROM node:16-alpine3.15

WORKDIR /client
ENV PATH /client/node_modules/.bin:$PATH
ENV CHOKIDAR_USEPOLLING=TRUE

COPY package*.json ./
RUN npm install --silent && npm install react-script -g --silent
COPY . .

CMD ["npm", "start"]