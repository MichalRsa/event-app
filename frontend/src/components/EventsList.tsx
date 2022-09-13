import Event from './Event';
import { EventData } from './Main';

const EventsList = ({ events }: { events: EventData[] }) => {
  return (
    <div className='max-full flex flex-wrap justify-around'>
      {!!events.length &&
        events.map((eventItem) => (
          <Event key={eventItem.id} eventItem={eventItem} />
        ))}
    </div>
  );
};

export default EventsList;
