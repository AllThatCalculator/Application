FROM node:16-alpine3.15

WORKDIR /client
COPY . .
# ENV PATH /client/node_modules/.bin:$PATH

# ========개발용==========
CMD ["npm", "start"]
ENV CHOKIDAR_USEPOLLING=TRUE
# ========배포용==========

# COPY package.json ./
# COPY package-lock.json ./

# RUN npm install --silent
# RUN npm install react-script -g --silent

# CMD [ "npm", "run", "build" ]
