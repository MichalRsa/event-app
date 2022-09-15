import { useEffect, useState } from 'react';
import AddEventForm from '../components/AddEventForm';
import EventsList from '../components/EventsList';
import axios from 'axios';
import { FormikState } from 'formik';

export type HandleSubmit = (
  values: {
    [key: string]: string;
  },
  {
    setSubmitting,
    resetForm,
  }: {
    setSubmitting: (isSubmitting: boolean) => void;
    resetForm: (
      nextState?:
        | Partial<
            FormikState<{
              [key: string]: string;
            }>
          >
        | undefined
    ) => void;
  }
) => Promise<unknown>;

export interface EventData {
  date: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
}

const Main = () => {
  const [events, setEvents] = useState<EventData[]>([]);

  const handleSubmit: HandleSubmit = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    await axios.post('http://localhost:3000/events', {
      ...values,
    });

    setSubmitting(false);
    getEvents();
    resetForm({
      values: {
        firstName: '',
        lastName: '',
        email: '',
        date: '',
      },
    });
  };

  const getEvents = async () => {
    const res = await axios.get('http://localhost:3000/events');
    setEvents(res.data);
  };

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <div>
      <div>
        <AddEventForm handleSubmit={handleSubmit} />
      </div>
      <div>
        <EventsList events={events} />
      </div>
    </div>
  );
};

export default Main;
