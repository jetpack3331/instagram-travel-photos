FROM node

RUN npm install -g coffee-script nodemon bower

WORKDIR /app/
