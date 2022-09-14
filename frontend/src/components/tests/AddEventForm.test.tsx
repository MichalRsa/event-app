import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, vi } from 'vitest';
import AddEventForm from '../AddEventForm.js';

describe('AddEventForm tests', () => {
  const mock = vi.fn();

  beforeEach(async () => {
    render(<AddEventForm handleSubmit={mock} />);

    return cleanup;
  });

  test('Change firstName input value', () => {
    const firstNameInput: HTMLInputElement =
      screen.getByPlaceholderText(/Jane/i);
    fireEvent.change(firstNameInput, { target: { value: 'Michał' } });
    expect(firstNameInput.value).toBe('Michał');
  });

  test('Throws error if first name is longer then 15 letter', async () => {
    const firstNameInput: HTMLInputElement =
      screen.getByPlaceholderText(/Jane/i);

    const user = userEvent.setup();
    await user.type(
      screen.getByLabelText(/First Name/i),
      'superlongnamethathastomuchletters'
    );
    await user.type(screen.getByLabelText(/Last Name/i), 'Dee');
    await user.type(
      screen.getByLabelText(/Email Address/i),
      'john.dee@someemail.com'
    );
    await user.type(screen.getByLabelText(/Date/i), '2040-09-14T15:04');
    await user.click(
      screen.getByRole('button', {
        name: /Add/i,
      })
    );

    const errorMessage = screen.getByText(/Must be 15 characters or less/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('Calls getEvents function when values are proper', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/First Name/i), 'Jane');
    await user.type(screen.getByLabelText(/Last Name/i), 'Dee');
    await user.type(
      screen.getByLabelText(/Email Address/i),
      'john.dee@someemail.com'
    );
    await user.type(screen.getByLabelText(/Date/i), '2040-09-14T15:04');
    await user.click(
      screen.getByRole('button', {
        name: /Add/i,
      })
    );

    await waitFor(() => expect(mock).toHaveBeenCalledTimes(1));
  });
});
