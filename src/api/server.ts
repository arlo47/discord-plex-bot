import express, { Application, json } from 'express';
import router from './router';
import { attachApiLogger } from './middleware/apiLogger';

const server: Application = express();

server.use(json());
server.use(attachApiLogger);
server.use('/', router);

export default server;
