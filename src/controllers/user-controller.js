import models from '../data/models';
import { DatabaseError, logger } from '../utils';

export const getUsers = async (req, res) => {
  try {
    const { User } = models;
    const result = await User.findAll({
    }).catch(error => {
      logger.error('Db error in getUsers', { error });
      throw new DatabaseError('Db operation failed');
    });
    logger.info(result);
    return res.status(200).json({
      users: result
    });
  } catch (error) {
    if (error instanceof DatabaseError) {
      return res.status(500).json({ errorCode: 'DB_ERROR' });
    }
    logger.error('getUsers error: ', { error });
    return res.status(500).json({ errorCode: 'GENERIC_ERROR' });
  }
};
