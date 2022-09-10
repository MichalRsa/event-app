import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Event } from './entity/event.entity';

const startServer = async (DB: DataSource) => {
  await DB.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err: any) => {
      console.error('Error during Data Source initialization', err);
    });

  const path = require('path');

  dotenv.config();

  let port = Number(process.env.POSTGRES_PORT);

  const app = express();

  app.get('/events', async function (req, res) {
    try {
      const users = await DB.getRepository(Event).find();

      console.log(users);
      res.json(users);
    } catch (err) {
      console.error(err);
    }
  });

  app.post('/events', async function (req, res) {
    const user = await DB.getRepository(Event).create(req.body);
    const results = await DB.getRepository(Event).save(user);
    return res.send(results);
  });

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
