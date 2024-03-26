import { logger } from './logger/logger';

process.on('uncaughtException', (error: Error) => {
  console.log('Uncaught Exception!!', error.message, error.stack);
  logger.error({
    message: 'Uncaught Execption!!',
    error: { message: error.message, stack: error.stack },
  });
});

import * as dotenv from 'dotenv';
dotenv.config();

import { initializeBot } from './bot/initialize';
import { getConfig } from './utils/config';
import server from './api/server';

const config = getConfig();
logger.info({ message: 'Config Initialized' });

initializeBot().catch((error) => {
  logger.error({
    message: 'Error Initializing Bot',
    error: { message: error.message, stack: error.stack },
  });
});

server.listen(config.server.port, async () => {
  logger.info({ message: 'Server Started', port: config.server.port });
});
