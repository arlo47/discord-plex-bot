import { Router } from 'express';
import controller from './routes/controller';
import multer, { FileFilterCallback, Multer } from 'multer';
import { authenticate } from './middleware/authenticate';
import {
  parseWebHook,
  validateWebHookType,
  validateName,
} from './middleware/webhooks';

const router = Router();

const upload: Multer = multer({
  fileFilter(req, file: Express.Multer.File, cb: FileFilterCallback) {
    // Plex sends a multi-part request for rating events. First part is a thumbnail
    // image, second is the JSON payload. I don't care about the image. This drops the
    // image.
    cb(null, false);
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

router.get('/*', controller.getCatchAll);

export default router;
