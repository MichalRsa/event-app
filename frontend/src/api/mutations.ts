import axios from 'axios';

export const setEvent = async (values: { [key: string]: string }) =>
  await axios.post('http://localhost:3000/events', {
    ...values,
  });
