import { Request, Response, NextFunction } from 'express';
import { getConfig } from '../../utils/config';
import { ResponseMessage } from '../../utils/constants';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const config = getConfig();

    const { token } = req.query;
    const tokens = config.plex.tokens;

    const validToken = tokens.find((t) => {
      return t === token;
    });

    if (!validToken) {
      return res.status(401).send({ message: ResponseMessage.Unauthorized });
    }

    next();
  } catch (error: any) {
    req.logger.error({
      message: 'Error in authenticate middleware',
      error: { err: error.message, stack: error.stack },
    });
    return res.status(500).send({ message: ResponseMessage.GenericError });
  }
};
