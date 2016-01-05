import { Router } from 'express';
import { ensureAuth } from './middleware/index';
import pingRouter from './routes/ping';

const router = Router();
export default router;

router.use('/ping', pingRouter);