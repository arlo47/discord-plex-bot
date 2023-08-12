import { Request, Response, NextFunction } from 'express';
import { getConfig } from '../../utils/config';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const config = getConfig();

  const token = req.params.token;

  if (!token || token !== config.plex.token) {
    return res.status(401).send({ message: 'unauthorized' });
  }

  next();
};
