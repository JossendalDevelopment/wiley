# prod stage
FROM node:10.16.0-alpine as prod-stage

ENV NODE_ENV=production

EXPOSE 3001

WORKDIR /app/server

COPY package*.json ./

RUN chown -R node:node .

USER node

RUN npm install --only=production && npm cache clean --force

COPY --chown=node:node . .

# see index.js for how server shutdown processes are being handled without an init process like tini
CMD ["node", "index.js"]


FROM prod-stage as dev-stage

ENV NODE_ENV=development

RUN npm install --only=development

CMD ["node", "index.js"]
