FROM alpine:3.18.4@sha256:eece025e432126ce23f223450a0326fbebde39cdf496a85d8c016293fc851978

RUN apk add --no-cache \
    nodejs=18.17.1-r0 \
    npm=9.6.6-r0

WORKDIR /opt/css

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

EXPOSE 8080

ENTRYPOINT ["npm", "run", "start"]
