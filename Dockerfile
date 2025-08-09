FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .


FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app .

COPY init.sh ./init.sh

RUN chmod +x ./init.sh

ENTRYPOINT ["./init.sh"]

ENV HTTP_PORT=3001

CMD ["npm", "run", "start:prod"]
