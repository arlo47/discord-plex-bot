import winston, { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

const { json, timestamp, prettyPrint } = format;

const redactSecrets: winston.Logform.FormatWrap = format((info) => {
  info.eventId = '[REDACTED]';
  return info;
});

export const logger = winston.createLogger({
  level: 'info',
  format: format.combine(json(), redactSecrets(), timestamp(), prettyPrint()),
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
