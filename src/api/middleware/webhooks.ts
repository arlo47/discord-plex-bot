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

    console.log('=== pre parsing ===');
    console.log(content);

    const payload = JSON.parse(content);

    console.log('=== post parsing ===');
    console.log(payload);

    req.body = payload;

    next();
  } catch (error: any) {
    console.log({ err: error.message, stack: error.stack });
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
