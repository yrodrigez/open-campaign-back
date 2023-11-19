import { Router } from 'express';
import renderRouter from './render';

const router = Router();

router.use('/cms', renderRouter);

export default router;
