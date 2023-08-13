import { Request, Response, NextFunction } from 'express';
import { ResponseMessage, PlexWebhookEvent } from '../../utils/constants';

export const parseWebHook = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = req.body.payload || req.body;
    const payload = JSON.parse(JSON.parse(content));

    req.body = payload;

    next();
  } catch (error: any) {
    console.log({ err: error.message, stack: error.stack });
    res.status(500).send({ message: ResponseMessage.GenericError });
  }
};

export const validateWebHookType = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const payload = req.body;

  if (payload.event !== PlexWebhookEvent.Rate) {
    return res.status(401).send({ message: ResponseMessage.GenericError });
  }

  next();
};
