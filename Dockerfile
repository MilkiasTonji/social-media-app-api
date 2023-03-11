FROM node:18-alpine
WORKDIR /api
COPY . .
RUN npm install
RUN npm rebuild bcrypt 
CMD [ "node", "index.js" ]
EXPOSE 3001