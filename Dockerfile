FROM node:14

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g sequelize-cli
COPY . .