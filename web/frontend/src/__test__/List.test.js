import { render, screen } from '@testing-library/react';
import ListView from '../components/ListView';

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

    render(<ListView
        bills={bills}
    />);


    const sum = bills.reduce((acc, bill) => acc + bill.amount, 0);
    const event = screen.getByText(new RegExp(`${sum}`));
    expect(event).toBeInTheDocument();
});
