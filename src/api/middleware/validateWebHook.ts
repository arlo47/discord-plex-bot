import { Request, Response, NextFunction } from 'express';

export const validateWebHookType = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next();
};
