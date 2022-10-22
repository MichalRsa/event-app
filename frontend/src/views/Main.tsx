import AddEventForm from '../components/AddEventForm';
import EventsList from '../components/EventsList';
import { FormikState } from 'formik';
import { useMutation, useQuery } from 'react-query';
import { getEvents } from '../api/queries';
import { setEvent } from '../api/mutations';

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
  const { data, refetch } = useQuery('events', getEvents, { initialData: [] });

  const mutation = useMutation(setEvent, { onSuccess: () => refetch() });

  const handleSubmit: HandleSubmit = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    mutation.mutate(values);

    setSubmitting(false);
    resetForm({
      values: {
        firstName: '',
        lastName: '',
        email: '',
        date: '',
      },
    });
  };

  return (
    <div>
      <div>
        <AddEventForm handleSubmit={handleSubmit} />
      </div>
      <div>
        <EventsList events={data} />
      </div>
    </div>
  );
};

export default Main;
