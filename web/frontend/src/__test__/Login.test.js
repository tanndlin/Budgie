import { render, screen } from '@testing-library/react';
import Login from '../components/Login';

test('Login Page has Email and Password', () => {
  render(<Login />);
  const emailInput = screen.getByTestId('email');
  expect(emailInput).toBeInTheDocument();

  const passwordInput = screen.getByTestId('password');
  expect(passwordInput).toBeInTheDocument();
});

test('Login Page has Forgot Password', () => {
  render(<Login />);
  const h1 = screen.getByText('Forgot Password?');
  expect(h1).toBeInTheDocument();
});
