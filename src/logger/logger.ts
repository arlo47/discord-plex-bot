import winston, { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import os from 'os';

const { json, timestamp, prettyPrint } = format;

export const logger = winston.createLogger({
  level: 'info',
  format: format.combine(json(), timestamp(), prettyPrint()),
  defaultMeta: {
    platform: os.platform(),
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
