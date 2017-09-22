FROM node:6.11


RUN apt-get update; apt-get upgrade -y;

ADD app/app.js /app/app.js
ADD app/package.json /app/package.json

RUN cd /app; npm install

CMD node /app/app.js