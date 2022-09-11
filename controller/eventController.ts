import express, { Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { Event } from '../entity/event.entity';
import { eventRepository } from '../repository/EventRepository';

const eventController = (DB: DataSource) => {
  const path = '/events';
  const router = express.Router();

  const intializeRoutes = () => {
    router.get(path, getAllEvents);
    router.post(path, createEvent);
  };

  const getAllEvents = async (req: Request, res: Response) => {
    const events = await eventRepository.getAllEvents();

    res.json(events);
  };
  const createEvent = async (req: Request, res: Response) => {
    const results = eventRepository.createEvent(req.body);

    res.send(results);
  };

  intializeRoutes();
  return router;
};

export default eventController;
