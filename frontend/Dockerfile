# Start your image with a node base image
FROM node:18

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]