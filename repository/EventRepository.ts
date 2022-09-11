import AppDataSource from '../config/database';
import { Event } from '../entity/event.entity';

export const eventRepository = AppDataSource.getRepository(Event).extend({
  getAllEvents() {
    return this.createQueryBuilder('event').getMany();
  },

  createEvent(event: Event) {
    return this.createQueryBuilder()
      .insert()
      .into(Event)
      .values(event)
      .execute();
  },
});
