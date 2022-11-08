import UserDto from '../data-transfer-object/user.dto';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import { authenticationRepository } from '../repository/AuthenticationRepository';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import LogInDto from '../data-transfer-object/login.dto';
import TokenData from '../interface/TokenData.interface';
import DataStoredInToken from '../interface/DataStoredInToken.interface';
import config from 'config';
import { User } from '../entity/user.entity';
import SomethindWentWrongException from '../exceptions/SomethingWentWrongException';
import { UserRepository } from '../repository/UserRepository';

const jwtConfig: any = config.get('jwt');

const createToken = (user: User): TokenData => {
  const expiresIn = 60 * 60; // an hour
  const secret = jwtConfig.secret;
  const dataStoredInToken: DataStoredInToken = {
    id: user.id.toString(),
  };
  return {
    expiresIn,
    token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
  };
};

const createCookie = (tokenData: TokenData) => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
};

const registration = async (userData: UserDto) => {
  if (await UserRepository.getUserByEmail(userData.email))
    throw new UserWithThatEmailAlreadyExistsException(userData.email);

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  await authenticationRepository.registerUser({
    ...userData,
    password: hashedPassword,
  });
  const user = await UserRepository.getUserByEmail(userData.email);
  if (typeof user !== 'object' || user === null)
    throw new SomethindWentWrongException();

  user.password = '';
  const tokenData = createToken(user);
  const cookie = createCookie(tokenData);
  return { user, cookie };
};

const loggingIn = async (logInData: LogInDto) => {
  const user = await UserRepository.getUserByEmail(logInData.email);
  if (!user) throw new WrongCredentialsException();

  const isPasswordMatching = await bcrypt.compare(
    logInData.password,
    user.password
  );
  if (!isPasswordMatching) throw new WrongCredentialsException();
  user.password = '';
  const tokenData = createToken(user);
  const cookie = createCookie(tokenData);
  return { user, cookie };
};

export default { registration, loggingIn };
