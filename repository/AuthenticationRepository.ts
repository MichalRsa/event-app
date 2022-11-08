import AppDataSource from '../config/database';
import UserDto from '../data-transfer-object/user.dto';
import { User } from '../entity/user.entity';

export const authenticationRepository = AppDataSource.getRepository(
  User
).extend({
  registerUser(user: UserDto) {
    return this.createQueryBuilder().insert().into(User).values(user).execute();
  },
});
