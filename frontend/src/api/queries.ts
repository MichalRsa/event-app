import axios from 'axios';

export const getEvents = async () => {
  const res = await axios.get('http://localhost:3000/events');
  return res.data;
};
