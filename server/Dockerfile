FROM node:6.11


RUN apt-get update; apt-get upgrade -y;

ADD app/package.json /app/package.json
RUN cd /app; npm install




RUN useradd --create-home -s /bin/false nodejs_user
WORKDIR /app


EXPOSE 5000 18080 80

ADD app/app.js /app/app.js
USER nodejs_user
CMD node /app/app.js