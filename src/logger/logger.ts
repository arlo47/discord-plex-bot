import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
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
    new DailyRotateFile({
      filename: path.join(__dirname, '/logs/bot-%DATE%.log'),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '5d',
    }),
    new winston.transports.Console({ handleExceptions: true }),
  ],
});
