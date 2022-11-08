import * as express from 'express';
import LogInDto from '../data-transfer-object/login.dto';
import UserDto from '../data-transfer-object/user.dto';
import validationMiddleware from '../middleware/validationMiddleware';
import authenticationService from '../service/authenticationService';

const AuthenticationController = () => {
  const path = '/auth';
  const router = express.Router();

  const initializeRoutes = () => {
    router.post(
      `${path}/register`,
      validationMiddleware(UserDto),
      registration
    );
    router.post(`${path}/login`, validationMiddleware(LogInDto), loggingIn);
  };

  const registration = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const userData: UserDto = request.body;
      const { user, cookie } = await authenticationService.registration(
        userData
      );
      response.setHeader('Set-Cookie', [cookie]);
      response.send(user);
    } catch (err) {
      next(err);
    }
  };

  const loggingIn = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const logInData: LogInDto = request.body;
      const { user, cookie } = await authenticationService.loggingIn(logInData);

      response.setHeader('Set-Cookie', [cookie]);
      response.send(user);
    } catch (err) {
      next(err);
    }
  };

  initializeRoutes();
  return router;
};

export default AuthenticationController;
