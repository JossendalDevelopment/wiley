# develop stage
FROM node:11-alpine as develop-stage
WORKDIR /app/server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001

CMD ["npm", "run", "start"]