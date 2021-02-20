FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
RUN npm run webpack
CMD ["npm", "run", "webpack"]