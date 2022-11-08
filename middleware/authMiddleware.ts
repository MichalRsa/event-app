import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import DataStoredInToken from '../interface/DataStoredInToken.interface';
import RequestWithUser from '../interface/RequestWithUser.interface';
import config from 'config';
import { UserRepository } from '../repository/UserRepository';

const jwtConfig: any = config.get('jwt');

async function authMiddleware(
  request: RequestWithUser,
  response: Response,
  next: NextFunction
) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = jwtConfig.secret;
    try {
      const verificationResponse = jwt.verify(
        cookies.Authorization,
        secret
      ) as unknown as DataStoredInToken;
      const id = Number(verificationResponse.id);
      const user = await UserRepository.getUserById(id);
      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;
