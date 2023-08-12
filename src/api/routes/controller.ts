import { Request, Response } from 'express';

const getRoot = (req: Request, res: Response) => {
  res.status(200).json({ health: 'ok' });
};

const getCatchAll = (req: Request, res: Response) => {
  res.status(404).json({ message: 'Endpoint not found.' });
};

const postPlexWebHook = (req: Request, res: Response) => {
  console.log('==== HEADER ====');
  console.log(req.header);
  console.log('====BODY ====');
  console.log(req.body);
  res.status(200).json({ message: 'ok' });
};

export default {
  getRoot,
  postPlexWebHook,
  getCatchAll,
};
