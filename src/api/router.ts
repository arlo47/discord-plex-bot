import { Router } from 'express';
import controller from './routes/controller';
import multer, { Multer } from 'multer';
import { authenticate } from './middleware/authenticate';
import {
  parseWebHook,
  validateWebHookType,
  validateName,
} from './middleware/webhooks';

const router = Router();

const upload: Multer = multer({
  storage: multer.memoryStorage(),
});

router.get('/', controller.getRoot);

router.post(
  '/webhook',
  [
    upload.single('thumbnail'),
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
