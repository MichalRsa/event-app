import express from 'express';
import dotenv from 'dotenv';
import AppDataSource from './config/database';

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    const path = require('path');

    dotenv.config();

    let port =
      typeof process.env.PORT === 'string' && parseFloat(process.env.PORT);

    const app = express();

    if (!port) {
      port = 3000;
    }

    app.get('/', (req, res) => res.send('ok'));

    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err: any) => {
    console.error('Error during Data Source initialization', err);
  });
