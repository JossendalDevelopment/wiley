# build stage
FROM node:10.16.0 as build-stage
# image from ffmpeg people with ffmpeg preconfigured
# FROM jrottenberg/ffmpeg:3.4-alpine as build-stage
LABEL MAINTAINER='Jossendal Development kevin.jossendal@revunit.com'
# Needed to run build command
RUN npm install -g @vue/cli
WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
# RUN npm install @vue/cli-service
RUN npm install --only=production && npm cache clean --force
COPY . .
# docker-build is custom script that reads from node_modules directory directly
# RUN npm run build
# CMD ["npm", "run", "build"]
CMD ["./node_modules/\\@vue/cli-service/bin/vue-cli-service.js", "build"]

# production stage
FROM nginx:1.16-alpine as production-stage
EXPOSE 80
RUN apk add --update --upgrade --no-cache wget
ADD ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]