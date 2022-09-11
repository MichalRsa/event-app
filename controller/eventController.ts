import express, { NextFunction, Request, Response } from 'express';
import { DataSource } from 'typeorm';
import CreateEventDto from '../data-transfer-object/createEvent.dto';
import validationMiddleware from '../middleware/validationMiddleware';
import { eventRepository } from '../repository/EventRepository';

const eventController = (DB: DataSource) => {
  const path = '/events';
  const router = express.Router();

  const intializeRoutes = () => {
    router.get(path, getAllEvents);
    router.post(path, validationMiddleware(CreateEventDto), createEvent);
  };

  const getAllEvents = async (req: Request, res: Response) => {
    const events = await eventRepository.getAllEvents();

    res.json(events);
  };
  const createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const results = await eventRepository.createEvent(req.body);

      res.send(results);
    } catch (err) {
      next(err);
    }
  };

  intializeRoutes();
  return router;
};

export default eventController;
