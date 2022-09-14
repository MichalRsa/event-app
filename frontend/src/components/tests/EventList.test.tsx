import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Event from '../Event';
import EventsList from '../EventsList';

describe('EventList tests', () => {
  it('Should render paragraph if event list is empty', () => {
    render(<EventsList events={[]} />);

    const event = screen.getByText(/Add your first event!/i);

    expect(event).toBeInTheDocument();
  });

  it('When provided array with two items, should render two Event components', () => {
    const eventsData = [
      {
        id: 12,
        date: '2030-09-16',
        email: 'mich@gmail.com',
        firstName: 'Michal',
        lastName: 'Rosa',
      },
      {
        id: 14,
        date: '2030-09-16',
        email: 'kuba@gmail.com',
        firstName: 'kuba',
        lastName: 'Rosa',
      },
    ];
    render(<EventsList events={eventsData} />);

    const eventsList = screen.getAllByTestId('event');
    eventsList.map((li) => li.getAttribute('p'));
    expect(eventsList.length).toBe(2);

    const eventItem = screen.getByText(/Michal Rosa/i);
    expect(eventItem).toBeInTheDocument();
  });
});
