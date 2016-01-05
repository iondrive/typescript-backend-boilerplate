import { Router } from 'express';

const router = Router();
export default router;

router.all('/',
  (req, res, next) => {
    res.ok('pong');
  }
);