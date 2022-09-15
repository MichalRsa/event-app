import { parseISO } from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';
interface eventProps {
  date: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
}

const Event = ({ eventItem }: { eventItem: eventProps }) => {
  const { firstName, lastName, email, date } = eventItem;

  const ISOTime = parseISO(date);

  const timeZone = 'utc';
  const formatedDate = format(
    utcToZonedTime(ISOTime, timeZone),
    'yyyy-MM-dd kk:mm',
    {
      timeZone,
    }
  );
  console.log(formatedDate);
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
