import { Event } from '../entity/event.entity';
import PastDateException from '../exceptions/PastDateException';
import { eventRepository } from '../repository/EventRepository';
import dateService from './dateService';

const createEvent = async (event: Event) => {
  const isPastDate = dateService.isPastDate(event.date);
  if (isPastDate) throw new PastDateException();

  const results = await eventRepository.createEvent(event);
  return results;
};

export default { createEvent };
