import { Request, Response, NextFunction } from 'express';
import { getConfig } from '../../utils/config';
import { ResponseMessage } from '../../utils/constants';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const config = getConfig();

  const { token } = req.query;

  if (!token || token !== config.plex.token) {
    return res.status(401).send({ message: ResponseMessage.Unauthorized });
  }

  next();
};
