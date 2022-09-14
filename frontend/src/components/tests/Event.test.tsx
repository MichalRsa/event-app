import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Event from '../Event';

describe('Should render Event componenet with proper values', () => {
  it('Renders Event', () => {
    const eventData = {
      id: 12,
      date: '2022-09-16',
      email: 'mich@gmail.com',
      firstName: 'Michal',
      lastName: 'Rosa',
    };
    render(<Event eventItem={eventData} />);

    const event = screen.getByText(/Michal Rosa/i);

    expect(event).toBeInTheDocument();
  });
});
