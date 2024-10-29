FROM node:22-alpine3.18@sha256:303dec48be59e127b9166900a5548dcc36e070a50e0b1604f1324787f92fd900

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .
RUN yarn build

CMD [ "yarn", "start" ]
