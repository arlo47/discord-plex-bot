import { Request, Response } from 'express';

const getRoot = (req: Request, res: Response) => {
  res.status(200).json({ health: 'ok' });
};

const getCatchAll = (req: Request, res: Response) => {
  res.status(404).json({ message: 'Endpoint not found.' });
};

export default {
  getRoot,
  getCatchAll,
};
