import express, { NextFunction, Request, Response } from 'express';
import { DataSource } from 'typeorm';
import CreateEventDto from '../data-transfer-object/createEvent.dto';
import authMiddleware from '../middleware/authMiddleware';
import validationMiddleware from '../middleware/validationMiddleware';
import { eventRepository } from '../repository/EventRepository';
import eventService from '../service/eventService';

const eventController = (DB: DataSource) => {
  const path = '/events';
  const router = express.Router();

  const intializeRoutes = () => {
    router.use(path, authMiddleware);
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
      const event = req.body;
      const results = await eventService.createEvent(event);

      res.send(results);
    } catch (err) {
      next(err);
    }
  };

  intializeRoutes();
  return router;
};

export default eventController;
