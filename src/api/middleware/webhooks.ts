import { Request, Response, NextFunction } from 'express';
import { ResponseMessage, PlexWebhookEvent } from '../../utils/constants';
import { PlexRateEvent } from '../../types/plex';

export const parseWebHook = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = req.body.payload || req.body;
    const payload = JSON.parse(content);

    req.body = payload;

    next();
  } catch (error: any) {
    req.logger.error({
      message: 'Error in parseWebhook middleware',
      error: { err: error.message, stack: error.stack },
    });
    res.status(500).send({ message: ResponseMessage.GenericError });
  }
};

export const validateName = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name } = req.query;

  if (typeof name !== 'string' && typeof name !== 'undefined') {
    req.logger.error({ error: 'Error in validateName', name });
    return res.status(400).send({ message: ResponseMessage.GenericError });
  }

  next();
};

export const validateWebHookType = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const payload: PlexRateEvent = req.body;

  if (payload.event !== PlexWebhookEvent.Rate) {
    req.logger.error({
      error: 'Error in validateWebHookType',
      event: payload.event,
    });
    return res.status(400).send({ message: ResponseMessage.GenericError });
  }

  next();
};
