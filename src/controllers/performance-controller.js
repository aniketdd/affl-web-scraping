import models from '../data/models';
import { DatabaseError, logger } from '../utils';

export const getPerformances = async (req, res) => {
  try {
    const { Performance } = models;
    const result = await Performance.findAll({
    }).catch(error => {
      logger.error('Db error in getPerformances', { error });
      throw new DatabaseError('Db operation failed');
    });
    logger.info(result);
    return res.status(200).json({
      data: result
    });
  } catch (error) {
    if (error instanceof DatabaseError) {
      return res.status(500).json({ errorCode: 'DB_ERROR' });
    }
    logger.error('getPerformances error: ', { error });
    return res.status(500).json({ errorCode: 'GENERIC_ERROR' });
  }
};
