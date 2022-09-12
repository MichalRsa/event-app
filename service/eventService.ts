import { Event } from '../entity/event.entity';
import PastDateException from '../exceptions/PastDateException';
import { eventRepository } from '../repository/EventRepository';

const createEvent = async (event: Event) => {
  const date = isPastDate(event.date);

  const results = await eventRepository.createEvent(event);
  return results;
};

const isPastDate = (dateString: Event['date']) => {
  const dateNow = new Date();
  const eventDate = new Date(dateString);
  if (dateNow < eventDate) return dateString;
  throw new PastDateException();
};

export default { createEvent, isPastDate };
