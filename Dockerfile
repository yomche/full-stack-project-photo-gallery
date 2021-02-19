FROM node:12-alpine
ENV PORT 8080
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
RUN npm run webpack
EXPOSE 8080
CMD ["npm", "run", "webpack"]