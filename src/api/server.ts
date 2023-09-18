import express, { Application, json } from 'express';
import router from './router';
import { initRequestLogger } from './middleware/logger';

const server: Application = express();

server.use(json());
server.use(initRequestLogger);
server.use('/', router);

export default server;
