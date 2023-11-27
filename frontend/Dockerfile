# Start your image with a node base image
FROM node:18-alpine

WORKDIR /usr/src/app/frontend

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]

EXPOSE 80