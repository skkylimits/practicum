FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=10000

EXPOSE 10000

CMD [ "npm", "start" ]
