# syntax=docker/dockerfile:1

# Docker / GitHub Actions Tutorial: https://docs.docker.com/build/ci/github-actions/

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx rimraf dist
RUN npx tsc
CMD [ "npm", "start" ]
EXPOSE 8080
