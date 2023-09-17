import { Request, Response, NextFunction } from 'express';
import { ResponseMessage } from '../../utils/constants';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../../logger/logger';

export const attachApiLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const childLogger = logger.child({ eventId: uuidv4() });
    req.logger = childLogger;
    next();
  } catch (error: any) {
    req.logger.error({ err: error.message, stack: error.stack });
    return res.status(500).send({ message: ResponseMessage.GenericError });
  }
};
