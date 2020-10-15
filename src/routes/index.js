import express from 'express';
import userRouter from './user';
import performanceRouter from './performance';

const router = express.Router();
router.use('/users', userRouter);
router.use('/performance', performanceRouter);

export default router;
