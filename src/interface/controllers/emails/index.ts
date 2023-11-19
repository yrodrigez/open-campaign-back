import { Router } from 'express';
import cmsRouter from './cms';

const router = Router();

router.use('/emails', cmsRouter);

export default router;
