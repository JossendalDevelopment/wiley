# # base image
# FROM node:lts-alpine
 
# # cached
# RUN npm install -g http-server
# RUN npm install -g @vue/cli

# # set working directory
# WORKDIR /app
 
# # install and cache app dependencies
# COPY package*.json ./

# # install project dependencies
# RUN npm install
# RUN cd server && npm install

# # copy project files
# COPY ./ /app

# # RUN npm run build

# EXPOSE 8080
# # start app
# # CMD [ "http-server", "dist"]
# CMD [ "npm", "run", "dev"]

# # production stage if needed 
# # FROM nginx:stable-alpine as production-stage
# # COPY --from=build-stage /app/dist /usr/share/nginx/html
# # EXPOSE 80
# # CMD ["nginx", "-g", "daemon off;"]

FROM node:10
COPY ./ /app
WORKDIR /app
RUN npm install && npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf