FROM alpine:3.20.0@sha256:77726ef6b57ddf65bb551896826ec38bc3e53f75cdde31354fbffb4f25238ebd

RUN apk add --no-cache \
    nodejs=20.13.1-r0 \
    npm=10.2.5-r0

WORKDIR /opt/css

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

EXPOSE 8080

ENTRYPOINT ["npm", "run", "start"]
