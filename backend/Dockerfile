# Start your image with a node base image
FROM node:alpine

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "server" ]