import {Router} from 'express';
import emailsRouter from './emails';

const router = Router();

router.use('/', emailsRouter);

export default router;
