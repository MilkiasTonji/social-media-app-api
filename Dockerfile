FROM node:18-alpine
WORKDIR /api
COPY . .
RUN npm install --production
CMD [ "node", "index.js" ]
EXPOSE 3001