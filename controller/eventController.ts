import express, { Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { Event } from '../entity/event.entity';

const eventController = (DB: DataSource) => {
  const path = '/events';
  const router = express.Router();

  const intializeRoutes = () => {
    router.get(path, getAllEvents);
    router.post(path, createEvent);
  };

  const getAllEvents = async (req: Request, res: Response) => {
    const users = await DB.getRepository(Event).find();

    res.json(users);
  };
  const createEvent = async (req: Request, res: Response) => {
    const user = await DB.getRepository(Event).create(req.body);
    const results = await DB.getRepository(Event).save(user);

    res.send(results);
  };

  intializeRoutes();
  return router;
};

export default eventController;
