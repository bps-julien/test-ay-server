FROM node:10

WORKDIR /var/projects/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

EXPOSE 8888

CMD [ "npm", "start" ]