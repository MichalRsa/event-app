import AppDataSource from './config/database';
import AuthenticationController from './controller/authenticationController';
import eventController from './controller/eventController';
import startServer from './server';

startServer(AppDataSource, [
  eventController(AppDataSource),
  AuthenticationController(),
]).then((app) =>
  app.listen(3000, () => console.log(`Server is running on port ${3000}`))
);
