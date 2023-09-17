import { Request, Response } from 'express';
import { ResponseMessage } from '../../utils/constants';
import { processRatingWebHook } from './model';
import { PlexRateEvent } from '../../types/plex';
import { logger } from '../../logger/logger';

const getRoot = (req: Request, res: Response) => {
  logger.info('hello from logger');
  res.status(200).json({ message: ResponseMessage.Success });
};

const catchAllNotFound = (req: Request, res: Response) => {
  console.log('catchAllNotFound endpoint hit');

  res.status(404).json({ message: ResponseMessage.NotFound });
};

const postPlexWebHook = (req: Request, res: Response) => {
  console.log('postPlexWebHook endpoint hit');

  try {
    const payload: PlexRateEvent = req.body;
    const name = req.query.name as unknown as string | undefined;

    processRatingWebHook(payload, name);

    res.status(200).json({ message: ResponseMessage.Success });
  } catch (error: any) {
    console.log({ err: error.message, stack: error.stack });
    res.status(500).send({ message: ResponseMessage.GenericError });
  }
};

export default {
  getRoot,
  postPlexWebHook,
  catchAllNotFound,
};
