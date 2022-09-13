interface eventProps {
  date: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
}

const Event = ({ eventItem }: { eventItem: eventProps }) => {
  const { id, firstName, lastName, email, date } = eventItem;
  return (
    <div className=' border bg-slate-200 w-96 m-8 p-4 rounded-lg'>
      <header className='flex justify-between font-medium pb-8'>
        <span>
          {firstName} {lastName}
        </span>
        <span>{email}</span>
      </header>
      <p></p>
      <p>Date: {date}</p>
    </div>
  );
};
export default Event;
