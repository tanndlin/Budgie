import App from '../App';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Rendering the app with no url will default to the login page

test('Login Page has Email and Password', () => {
    render(<App />);
    const emailInput = screen.getByTestId('email');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password');
    expect(passwordInput).toBeInTheDocument();
});

test('Login Page has Forgot Password', () => {
    render(<App />);
    const h1 = screen.getByText('Forgot Password?');
    expect(h1).toBeInTheDocument();
});
