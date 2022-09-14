import Event from './Event';
import { EventData } from '../views/Main';

const EventsList = ({ events }: { events: EventData[] }) => {
  return (
    <div className='max-full flex flex-wrap justify-around'>
      {!!events.length ? (
        events.map((eventItem) => (
          <Event key={eventItem.id} eventItem={eventItem} />
        ))
      ) : (
        <p className='py-8'>Add your first event!</p>
      )}
    </div>
  );
};

export default EventsList;
