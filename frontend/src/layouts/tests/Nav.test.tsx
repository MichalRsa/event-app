import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Nav from '../Nav';

describe('Accordion test', () => {
  it("Should show Nav's title all the time", () => {
    render(<Nav />);

    expect(screen.getByText(/Event Planner/i)).toBeDefined();
  });
});
