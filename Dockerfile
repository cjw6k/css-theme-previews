FROM alpine:3.21.0@sha256:21dc6063fd678b478f57c0e13f47560d0ea4eeba26dfc947b2a4f81f686b9f45

ARG NODEJS_VERSION=20.15.1-r0
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
