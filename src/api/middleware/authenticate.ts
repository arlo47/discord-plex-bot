import { Request, Response, NextFunction } from 'express';
import { getConfig } from '../../utils/config';
import { ResponseMessage } from '../../utils/constants';
import { ensureError } from '../../utils/error';

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
      req.logger.error({ message: 'Unauthorized' });
      return res.status(401).send({ message: ResponseMessage.Unauthorized });
    }

    next();
  } catch (err: unknown) {
    const error: Error = ensureError(err);
    req.logger.error({
      message: 'Error in authenticate middleware',
      error: { err: error.message, stack: error.stack },
    });
    return res.status(500).send({ message: ResponseMessage.GenericError });
  }
};
