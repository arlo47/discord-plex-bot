import { Request, Response } from 'express';

const getRoot = (req: Request, res: Response) => {
  res.status(200).json({ health: 'ok' });
};

const getCatchAll = (req: Request, res: Response) => {
  res.status(404).json({ message: 'Endpoint not found.' });
};

const postPlexWebHook = (req: Request, res: Response) => {
  try {
    const content = req.body.payload || req.body;
    const payload = JSON.parse(content);

    console.log('==== PAYLOAD ====');
    console.log(JSON.stringify(payload));
    res.status(200).json({ message: 'ok' });
  } catch (error: any) {
    console.log({ err: error.message, stack: error.stack });
    res.status(500).send({ message: error.message });
  }
};

export default {
  getRoot,
  postPlexWebHook,
  getCatchAll,
};
