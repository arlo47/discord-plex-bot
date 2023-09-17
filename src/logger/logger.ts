import winston from 'winston';
import path from 'path';
import os from 'os';
import { getConfig } from '../utils/config';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {
    platform: os.platform(),
    environment: getConfig().server.environment,
  },
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, 'logs/logs.log'),
    }),
    new winston.transports.Console({ handleExceptions: true }),
  ],
});
