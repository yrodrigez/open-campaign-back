import { Router } from 'express';
import RenderEmailRouter from './RenderEmailRouter';

const router = Router();

router.use('/render', RenderEmailRouter);

export default router;
