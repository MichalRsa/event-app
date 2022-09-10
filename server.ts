import express from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

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

  if (!port) {
    port = 3000;
  }

  app.get('/', (req, res) => res.send('ok'));

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};

export default startServer;
