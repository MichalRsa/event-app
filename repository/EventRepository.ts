import AppDataSource from '../config/database';
import CreateEventDto from '../data-transfer-object/createEvent.dto';
import { Event } from '../entity/event.entity';

export const eventRepository = AppDataSource.getRepository(Event).extend({
  getAllEvents() {
    return this.createQueryBuilder('event').getMany();
  },

  createEvent(event: CreateEventDto) {
    return this.createQueryBuilder()
      .insert()
      .into(Event)
      .values(event)
      .execute();
  },
});
