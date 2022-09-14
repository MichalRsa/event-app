import { format } from 'date-fns';
interface eventProps {
  date: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
}

const Event = ({ eventItem }: { eventItem: eventProps }) => {
  const { firstName, lastName, email, date } = eventItem;
  const formatedDate = format(new Date(date), 'MM.dd.yyyy H:m');
  return (
    <div
      data-testid='event'
      className=' border bg-slate-200 w-96 m-8 p-4 rounded-lg'
    >
      <header className='flex justify-between font-medium pb-8'>
        <span>
          {firstName} {lastName}
        </span>
        <span>{email}</span>
      </header>
      <p></p>
      <p>Date: {formatedDate}</p>
    </div>
  );
};
export default Event;
