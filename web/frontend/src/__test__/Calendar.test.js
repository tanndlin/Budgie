import { render, screen } from '@testing-library/react';
import BigCalendar from '../components/Calendar';

test('Events red on unpaid', () => {
    render(<BigCalendar
        events={[{
            title: 'Hello World',
            start: new Date(),
            end: new Date(),
            allDay: true,
            resources: { paid: false, }
        }]}
    />);

    const event = screen.getByText(/Hello World/i);
    expect(event).toHaveStyle('background-color: #f74f31 !important')
});

test('Events green on paid', () => {
    render(<BigCalendar
        events={[{
            title: 'Hello World',
            start: new Date(),
            end: new Date(),
            allDay: true,
            resources: { paid: true, }
        }]}
    />);

    const event = screen.getByText(/Hello World/i);
    expect(event).toHaveStyle('background-color: #7aff75 !important')
});
