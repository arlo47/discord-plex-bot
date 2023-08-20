import { Request, Response } from 'express';
import { ResponseMessage } from '../../utils/constants';
import { processRatingWebHook } from './model';
import { PlexRateEvent } from '../../types/plex';

const getRoot = (req: Request, res: Response) => {
  console.log('getRoot endpoint hit');
  res.status(200).json({ message: ResponseMessage.Success });
};

const catchAllNotFound = (req: Request, res: Response) => {
  console.log(
    `${req.method} ${req.protocol}://${req.hostname}${req.originalUrl} Not Found`,
  );
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
