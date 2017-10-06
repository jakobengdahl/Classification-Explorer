FROM node:8.6
EXPOSE 8080
RUN npm install
RUN npm run build
