import {Router} from 'express';
import emailsRouter from './emails';

const router = Router();

router.use('/api', emailsRouter);

export default router;
