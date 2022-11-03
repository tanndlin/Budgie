import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders header', () => {
  render(<App />);
  const header = screen.getByText(/Budgie/i);
  expect(header).toBeInTheDocument();
});

test('renders login page', () => {
  render(<App />);
  const h1 = screen.getByText('forgot password?');
  expect(h1).toBeInTheDocument();
});
