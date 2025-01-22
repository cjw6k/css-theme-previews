FROM alpine:3.21.2@sha256:56fa17d2a7e7f168a043a2712e63aed1f8543aeafdcee47c58dcffe38ed51099

ARG NODEJS_VERSION=22.11.0-r1
ARG NPM_VERSION=10.9.1-r0

RUN apk add --no-cache \
    nodejs=${NODEJS_VERSION} \
    npm=${NPM_VERSION}

WORKDIR /opt/css

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

EXPOSE 8080

ENTRYPOINT ["npm", "run", "start"]
