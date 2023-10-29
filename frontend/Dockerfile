# Start your image with a node base image
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

# RUN npm run build

CMD ["npm", "run", "dev"]