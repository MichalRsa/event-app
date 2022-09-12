import { Event } from '../entity/event.entity';

const isPastDate = (dateString: Event['date']) => {
  const dateNow = new Date();
  const eventDate = new Date(dateString);
  return dateNow > eventDate;
};

export default { isPastDate };
