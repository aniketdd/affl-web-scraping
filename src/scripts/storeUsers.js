import { getAllRegresUsers, logger } from '../utils';
import models from '../data/models';
import settings from '../config';

export async function storeUsers() {
  const { success, users } = await getAllRegresUsers(settings.regresApiUrl);
  if (!success) {
    setTimeout(storeUsers, 60000);
    return null;
  }
  const { User } = models;
  return User.bulkCreate(users.map(user => ({
    userid: user.id,
    email: user.email,
    firstname: user.first_name,
    lastname: user.last_name,
    avatar: user.avatar
  }))).then(() => {
    logger.info('Users Added');
    return {
      success: true,
    };
  }).catch(error => {
    logger.error(error);
    return {
      success: false
    };
  });
}
