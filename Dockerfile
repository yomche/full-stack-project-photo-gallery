FROM node:15.8-alpine3.11 AS build
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm build

FROM nginx:1.19-alpine
COPY --from=build /app/dist /opt/site
COPY nginx.conf /etc/nginx/nginx.conf