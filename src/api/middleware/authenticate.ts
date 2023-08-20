import { Request, Response, NextFunction } from 'express';
import { getConfig } from '../../utils/config';
import { ResponseMessage } from '../../utils/constants';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const config = getConfig();

  const tokens = config.plex.tokens;

  const { token } = req.query;

  const foundToken = tokens.find((t) => {
    return t === token;
  });

  if (!foundToken) {
    return res.status(401).send({ message: ResponseMessage.Unauthorized });
  }

  next();
};
