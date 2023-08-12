import { Router } from 'express';
import controller from './routes/controller';
import multer, { FileFilterCallback, Multer } from 'multer';
import { authenticate } from './middleware/authenticate';

const router = Router();

const upload: Multer = multer({
  fileFilter(req, file: Express.Multer.File, cb: FileFilterCallback) {
    cb(null, false);
  },
});

router.get('/', controller.getRoot);

router.post(
  '/webhook',
  [upload.single('thumb'), authenticate],
  controller.postPlexWebHook,
);

router.get('/*', controller.getCatchAll);

export default router;
