import { useEffect, useState } from 'react';
import AddEventForm from './AddEventForm';
import EventsList from './EventsList';
import axios from 'axios';

export interface EventData {
  date: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
}

const Main = () => {
  const [events, setEvents] = useState<EventData[]>([]);

  const getEvents = async () => {
    const res = await axios.get('http://localhost:3000/events');
    console.log(res.data);
    setEvents(res.data);
  };

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <div className=''>
      <div>
        <AddEventForm getEvents={getEvents} />
      </div>
      <div>
        <EventsList events={events} />
      </div>
    </div>
  );
};

export default Main;
