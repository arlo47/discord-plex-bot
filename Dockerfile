# syntax=docker/dockerfile:1

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install husky -g
RUN npm install
RUN npx tsc

FROM node:18-alpine AS final
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package*.json ./
RUN npm install husky -g
RUN npm install --omit=dev

CMD [ "npm", "start" ]
EXPOSE 8080