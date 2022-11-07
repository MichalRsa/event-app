import AppDataSource from '../config/database';
import UserDto from '../data-transfer-object/user.dto';
import { User } from '../entity/user.entity';

export const authenticationRepository = AppDataSource.getRepository(
  User
).extend({
  // TODO: CONSIDER MAKING ANOTHER REPOSITORY FOR THIS QUERY EG. UserRepository.ts
  getUserByEmail(email: UserDto['email']) {
    return this.createQueryBuilder('user')
      .where('user.email = :email', {
        email: email,
      })
      .getOne();
    // return this.createQueryBuilder('user').getMany();
  },

  registerUser(user: UserDto) {
    return this.createQueryBuilder().insert().into(User).values(user).execute();
    //         ...userData,
    //         password: hashedPassword,
    //       });
  },
});
