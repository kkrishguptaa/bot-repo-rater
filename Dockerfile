FROM node:21-alpine3.18@sha256:1f7f5ae05d6db3ef8c214ef3556801349add3aa68fd7ff4d9f39fbf22c15e861

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .
RUN yarn build

CMD [ "yarn", "start" ]
