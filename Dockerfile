FROM alpine:3.22.2@sha256:4b7ce07002c69e8f3d704a9c5d6fd3053be500b7f1c69fc0d80990c2ad8dd412

ARG NODEJS_VERSION=22.16.0-r2
ARG NPM_VERSION=11.3.0-r1

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
