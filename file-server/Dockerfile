FROM node:10.16.0

RUN apt-get update && apt-get install -y software-properties-common ffmpeg
RUN add-apt-repository ppa:jonathonf/ffmpeg-4
RUN apt-get install bc
# set our node environment, either development or production
# defaults to production, compose can ovveride this
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 3000 for node
# ARG PORT=9000
# ENV PORT $PORT
# EXPOSE $PORT 9229 9230 8080 3000
EXPOSE 3000

# you'll likely want the latest npm, regardless of node version, for speed and fixes
# but pin this version for the best stability
RUN npm i npm@latest -g

RUN mkdir /opt/node_app && chown root:root /opt/node_app
# RUN mkdir /opt/node_app
WORKDIR /opt/node_app

COPY package.json package-lock.json* ./

RUN npm install --no-optional && npm cache clean --force

ENV PATH /opt/node_app/node_modules/.bin:$PATH

# check every 30s to ensure this service returns HTTP 200
HEALTHCHECK --interval=30s CMD node healthcheck.js

# copy in our source code last, as it changes the most
WORKDIR /opt/node_app/app

COPY . .

# if you want to use npm start instead, then use `docker run --init in production`
# so that signals are passed properly. Note the code in index.js is needed to catch Docker signals
# using node here is still more graceful stopping then npm with --init afaik
# I still can't come up with a good production way to run with npm and graceful shutdown
CMD [ "node", "index.js" ]