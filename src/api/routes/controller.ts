import { Request, Response } from 'express';

const getRoot = (req: Request, res: Response) => {
  res.status(200).json({ health: 'ok' });
};

const getCatchAll = (req: Request, res: Response) => {
  res.status(404).json({ message: 'Endpoint not found.' });
};

const postPlexWebHook = (req: Request, res: Response) => {
  console.log('==== HEADER ====');
  console.log(JSON.stringify(req.headers));
  console.log('====BODY ====');
  console.log(JSON.stringify(req.body));
  console.log('====REQ ====');
  console.log(JSON.stringify(req));
  res.status(200).json({ message: 'ok' });
};

export default {
  getRoot,
  postPlexWebHook,
  getCatchAll,
};
