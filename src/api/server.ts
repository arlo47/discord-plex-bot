import express, { Application, json } from 'express';
import router from './router';
import { connectApiLogger } from './middleware/logger';

const server: Application = express();

server.use(connectApiLogger);
server.use(json());
server.use('/', router);

export default server;
