import { Router, Request } from 'express';
import controller from './routes/controller';
import multer, { FileFilterCallback, Multer } from 'multer';
import { authenticate } from './middleware/authenticate';
import {
  parseWebHook,
  validateWebHookType,
  validateName,
} from './middleware/webhooks';
import { ImageMimeType } from '../utils/constants';

const router = Router();

const upload: Multer = multer({
  fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    /**
     * FileFilterCallback second parameter is a boolean,
     * true returns file, false filters file out
     */
    req.logger.info({ message: 'FileFilter Info', file });

    if (Object.values(ImageMimeType).includes(file.mimetype as ImageMimeType)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

router.get('/', controller.getRoot);

router.post(
  '/webhook',
  [
    upload.single('thumb'),
    authenticate,
    parseWebHook,
    validateWebHookType,
    validateName,
  ],
  controller.postPlexWebHook,
);

router.get('/*', controller.catchAllNotFound);
router.post('/*', controller.catchAllNotFound);

export default router;
