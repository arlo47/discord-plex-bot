import { Router } from 'express';
import controller from './routes/controller';

const router = Router();

router.get('/', controller.getRoot);

router.get('/*', controller.getCatchAll);

export default router;
