FROM node:17.9.0-alpine3.15

RUN mkdir /opt/noddy
WORKDIR /opt/noddy
COPY app.js src package-lock.json package.json /opt/noddy/
RUN npm i

ENV PORT=3000
ENV MOUNT_PATH="/"
EXPOSE 3000
USER node
CMD node app.js
