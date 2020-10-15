import express from 'express';
import { getPerformances } from '../controllers/performance-controller';

const router = express.Router();

router.get('/', getPerformances);

module.exports = router;
