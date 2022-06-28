FROM node

EXPOSE 80

WORKDIR /usr/src/app

COPY ./express-server/ .
RUN npm install

ENTRYPOINT ["npm", "start"]
