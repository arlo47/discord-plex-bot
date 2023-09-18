import { Request, Response, NextFunction } from 'express';
import { ResponseMessage, PlexWebhookEvent } from '../../utils/constants';
import { PlexRateEvent } from '../../types/plex';
import { ensureError } from '../../utils/error';

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
  } catch (err: unknown) {
    const error: Error = ensureError(err);
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
    return res.status(400).send({ message: ResponseMessage.GenericError });
  }

  next();
};
