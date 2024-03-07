FROM node:21-alpine3.18@sha256:5751df259dc0ff6491773626086862580801bb2caea7d738749eee1a9b38b77e

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .
RUN yarn build

CMD [ "yarn", "start" ]
