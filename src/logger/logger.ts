import winston, { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import Redact from 'redact-secrets';

const redactor = Redact('REDACTED');

const { json, timestamp, prettyPrint } = format;

const redactSecrets: winston.Logform.FormatWrap = format((info) => {
  const redacted = redactor.map(info);

  // redact-secrets strips Symbols from the log, which are needed.
  // add them back to the redacted log object
  const levelSym = Symbol.for('level');
  redacted[levelSym] = info[levelSym];

  return redacted;
});

export const logger = winston.createLogger({
  level: 'info',
  format: format.combine(redactSecrets(), json(), timestamp(), prettyPrint()),
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
