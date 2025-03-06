FROM node:alpine

WORKDIR usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

ENV LOGFILE_PATH=./logs/fingerprints.log

ENV HASHFILE_PATH=./logs/hashes.json

CMD ["npm", "start"]
