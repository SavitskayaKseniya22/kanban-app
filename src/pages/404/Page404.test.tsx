import React from 'react';
import { render, screen } from '@testing-library/react';
import Page404 from './Page404';

test('renders 404 page', () => {
  render(<Page404 />);
  const errorElement = screen.getByText(/404/i);
  expect(errorElement).toBeInTheDocument();
});
