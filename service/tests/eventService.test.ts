import CreateEventDto from '../../data-transfer-object/createEvent.dto';
import PastDateException from '../../exceptions/PastDateException';
import { eventRepository } from '../../repository/EventRepository';
import dateService from '../dateService';
import eventService from '../eventService';

describe('eventService tests', () => {
  describe('createEvent test', () => {
    const validData: CreateEventDto = {
      firstName: 'michal',
      lastName: 'rosa',
      email: 'michal@mail.com',
      date: '2030-12-31',
    };

    const invalidData: CreateEventDto = {
      firstName: 'michal',
      lastName: 'rosa',
      email: 'michal@mail.com',
      date: '2010-12-31',
    };
    describe('User provides past date', () => {
      it('Should throw  past date exception', async () => {
        await expect(
          eventService.createEvent(invalidData)
        ).rejects.toMatchObject(new PastDateException());
      });
    });
    describe('User provides proper data', () => {
      it("Should add row to datebase, and retur it's id", async () => {
        eventRepository.createEvent = jest.fn().mockReturnValue({
          identifiers: [
            {
              id: 94,
            },
          ],
          generatedMaps: [
            {
              id: 94,
            },
          ],
          raw: [
            {
              id: 94,
            },
          ],
        });

        await expect(eventService.createEvent(validData)).resolves.toEqual([
          {
            id: 94,
          },
        ]);
      });
    });
  });
});
