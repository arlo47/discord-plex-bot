import { logger } from './logger/logger';

process.on('uncaughtException', (error: NodeJS.ErrnoException) => {
  logger.error({
    message: 'Uncaught Execption!',
    error: { message: error.message, stack: error.stack },
  });
  console.log('Uncaught Exception!!', error.message, error.stack);
});

import * as dotenv from 'dotenv';
dotenv.config();

import { initializeBot } from './bot/initialize';
import { getConfig } from './utils/config';
import server from './api/server';

const config = getConfig();
logger.info({ message: 'Config Initialized' });

initializeBot();

server.listen(config.server.port, () => {
  logger.info({ message: 'Server Started', port: config.server.port });
});
