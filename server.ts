import express, { Router } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import errorMiddleware from './middleware/errorMiddleware';
import bodyParser from 'body-parser';
import cors from 'cors';

const startServer = async (DB: DataSource, controllers: [Router]) => {
  await DB.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err: unknown) => {
      console.error('Error during Data Source initialization', err);
    });

  dotenv.config();

  let port = Number(process.env.PORT);

  const app = express();

  app.use(cors());

  app.use(bodyParser.json());

  const initializeControllers = (controllers: express.Router[]) => {
    controllers.forEach((controller) => {
      app.use('/', controller);
    });
  };

  initializeControllers(controllers);

  app.use(errorMiddleware);

  if (!port) {
    port = 3000;
  }

  app.get('/', (req, res) => res.send('ok'));

  return app;
};

export default startServer;
