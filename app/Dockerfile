FROM node:10
WORKDIR /var/project/app
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 8181
CMD [ "npm","start" ]