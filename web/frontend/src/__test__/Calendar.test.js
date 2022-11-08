import { render, screen } from '@testing-library/react';
import BigCalendar from '../components/Calendar';

test('Events red on unpaid', () => {
    render(<BigCalendar
        bills={[{
            title: 'Hello World',
            start: new Date(),
            end: new Date(),
            allDay: true,
            resources: { paid: false, }
        }]}
    />);

    const event = screen.getByText(/Hello World/);
    expect(event).toHaveStyle('background-color: rgb(248 113 113) !important');
});

test('Events green on paid', () => {
    render(<BigCalendar
        bills={[{
            title: 'Hello World',
            start: new Date(),
            end: new Date(),
            allDay: true,
            resources: { paid: true, }
        }]}
    />);

    const event = screen.getByText(/Hello World/);
    expect(event).toHaveStyle('background-color: rgb(74 222 128) !important');
});

test('Sums total of bills', () => {
    const bills = [];
    for (let i = 0; i < 10; i++) {
        bills.push({
            title: 'Hello World',
            start: new Date(),
            end: new Date(),
            allDay: true,
            resources: { paid: false, },
            amount: Math.floor(Math.random() * 100),
        });
    }

    render(<BigCalendar
        bills={bills}
    />);


    const sum = bills.reduce((acc, bill) => acc + bill.amount, 0);
    const checkContent = screen.getByTestId('billSum');
    expect(checkContent).toHaveTextContent(`$${sum} / month`);
});

test('Do not sum bills that no longer recur', () => {
    render(<BigCalendar
        bills={[
            {
                title: 'Hello World',
                start: new Date(0),
                end: new Date(0),
                amount: 100,
            }
        ]}
    />);


    const checkContent = screen.getByTestId('billSum');
    expect(checkContent).toHaveTextContent('$0 / month');
});