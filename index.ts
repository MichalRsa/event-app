import AppDataSource from './config/database';
import eventController from './controller/eventController';
import startServer from './server';

startServer(AppDataSource, [eventController(AppDataSource)]);
