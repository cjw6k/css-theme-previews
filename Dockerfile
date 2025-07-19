FROM alpine:3.22.1@sha256:4bcff63911fcb4448bd4fdacec207030997caf25e9bea4045fa6c8c44de311d1

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
