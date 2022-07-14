FROM node:alpine

WORKDIR /client
COPY . .
# ENV PATH /client/node_modules/.bin:$PATH

# ========개발용==========
CMD ["npm", "start"]

# ========배포용==========

# COPY package.json ./
# COPY package-lock.json ./

# RUN npm install --silent
# RUN npm install react-script -g --silent

# CMD [ "npm", "run", "build" ]
