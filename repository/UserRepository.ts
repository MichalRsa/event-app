import AppDataSource from '../config/database';
import UserDto from '../data-transfer-object/user.dto';
import { User } from '../entity/user.entity';

export const UserRepository = AppDataSource.getRepository(User).extend({
  getUserByEmail(email: UserDto['email']) {
    return this.createQueryBuilder('user')
      .where('user.email = :email', {
        email: email,
      })
      .getOne();
  },

  getUserById(id: User['id']) {
    return this.createQueryBuilder('user')
      .where('user.id = :id', {
        id,
      })
      .getOne();
  },
});
