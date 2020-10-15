import { getAllRegresUsers } from '../utils';
import models from '../data/models';

export async function storeUsers() {
  const { success, users } = await getAllRegresUsers('https://reqres.in/api/users');
  if (!success) {
    setTimeout(storeUsers, 60000);
    return;
  }
  const { User } = models;
  // eslint-disable-next-line consistent-return
  return User.bulkCreate(users.map(user => ({
    userid: user.id,
    email: user.email,
    firstname: user.first_name,
    lastname: user.last_name,
    avatar: user.avatar
  }))).then(() => {
    console.log('Users Added');
    return {
      success: true,
    };
  }).catch(error => {
    console.error(error);
    return {
      success: false
    };
  });
}
