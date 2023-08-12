import { Router } from 'express';
import controller from './routes/controller';
import multer, { Multer } from 'multer';

const router = Router();
const upload: Multer = multer();

router.get('/', controller.getRoot);
router.post('/hook', upload.none(), controller.postPlexWebHook);
router.get('/*', controller.getCatchAll);

export default router;
