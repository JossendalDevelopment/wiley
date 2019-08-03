# build stage
FROM node:10.16.0 as build-stage
LABEL MAINTAINER='kevin.jossendal@revunit.com'
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install -g @vue/cli

COPY package*.json ./

RUN npm install --only=production && npm cache clean --force

COPY . .

CMD ["npm", "run", "build"]

# production stage
FROM nginx:1.16-alpine as production-stage
EXPOSE 80
RUN apk add --update --upgrade --no-cache wget
ADD ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]