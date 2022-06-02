FROM node

WORKDIR /auth-simple

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "server.js"]