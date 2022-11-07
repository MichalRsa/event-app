import UserDto from '../data-transfer-object/user.dto';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import { authenticationRepository } from '../repository/AuthenticationRepository';
import * as bcrypt from 'bcryptjs';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import LogInDto from '../data-transfer-object/login.dto';

const registration = async (userData: UserDto) => {
  if (await authenticationRepository.getUserByEmail(userData.email))
    throw new UserWithThatEmailAlreadyExistsException(userData.email);

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  await authenticationRepository.registerUser({
    ...userData,
    password: hashedPassword,
  });
  const user = await authenticationRepository.getUserByEmail(userData.email);
  if (typeof user === 'object' && user !== null) {
    user.password = '';
  }
  console.log(user);
  return user;
};
const loggingIn = async (logInData: LogInDto) => {
  const user = await authenticationRepository.getUserByEmail(logInData.email);
  if (!user) throw new WrongCredentialsException();

  const isPasswordMatching = await bcrypt.compare(
    logInData.password,
    user.password
  );
  if (!isPasswordMatching) throw new WrongCredentialsException();
  user.password = '';
  return user;
};

export default { registration, loggingIn };
