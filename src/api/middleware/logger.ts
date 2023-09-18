import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { logger } from '../../logger/logger';

export const connectApiLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const startTime = dayjs().toISOString();

  const childLogger = logger.child({
    eventId: uuidv4(),
  });
  req.logger = childLogger;

  req.logger.info({
    message: 'Start HTTP Request',
    request: {
      host: req.hostname,
      url: req.url,
      params: req.params,
      query: req.query,
      body: req.body,
    },
  });

  const destroyLogger = () => {
    const endTime = dayjs().toISOString();
    const duration = dayjs(endTime).diff(dayjs(startTime), 'milliseconds');

    req.logger.info({
      message: 'HTTP Request Complete',
      response: { statusCode: res.statusCode },
      duration: `${duration}ms`,
    });

    res.removeListener('finish', destroyLogger);
    res.removeListener('close', destroyLogger);
  };

  res.on('finish', destroyLogger);
  res.on('close', destroyLogger);

  next();
};
