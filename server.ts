import express, { NextFunction, Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

const startServer = async (DB: DataSource, controllers: [Router]) => {
  await DB.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err: unknown) => {
      console.error('Error during Data Source initialization', err);
    });

  const path = require('path');

  dotenv.config();

  let port = Number(process.env.POSTGRES_PORT);

  const app = express();

  const initializeControllers = (controllers: express.Router[]) => {
    controllers.forEach((controller) => {
      app.use('/', controller);
    });
  };

  initializeControllers(controllers);

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.response?.status === 400) {
      res
        .status(400)
        .send({ error: err.response.data.error.message, status: 400 });
      console.error('====================== status 400');
    }
  });

  if (!port) {
    port = 3000;
  }

  app.get('/', (req, res) => res.send('ok'));

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};

export default startServer;
