FROM node:16.16

WORKDIR /server
ENV PATH /server/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --silent

COPY . .

# ========개발용==========
CMD [ "npx", "nodemon", "-L", "main.js"]