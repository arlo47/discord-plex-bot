import express, { Application, json } from 'express';
import router from './router';

const server: Application = express();

server.use(json());
server.use('/', router);

export default server;
