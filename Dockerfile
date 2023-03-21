FROM alpine:edge@sha256:ff8db144214ae3fe9d1b29d3bc352e0e3d4e1dba36a39f65dce4c8b42c37ea77

RUN apk add --no-cache \
    nodejs=18.14.2-r0 \
    npm=9.5.1-r0

WORKDIR /opt/css

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

EXPOSE 8080

ENTRYPOINT ["npm", "run", "start"]
