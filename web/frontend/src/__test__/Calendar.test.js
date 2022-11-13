/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { BigCalendar, getEventsFromBills } from '../components/Calendar';

test('Events red on unpaid', () => {
    const categories = [
        {
            name: 'All',
            id: -1,
        },
    ];
    render(<BigCalendar
        bills={[{
            title: 'Hello World',
            start: new Date(),
            end: new Date(),
            lastPaid: null,
        }]}
        categories={categories}
        categorySortID={-1}
    />);

    const event = screen.getByText(/Hello World/);
    expect(event.parentElement).toHaveClass('unpaid');
});

test('Events green on paid', () => {
    const categories = [
        {
            name: 'All',
            id: -1,
        },
    ];

    render(<BigCalendar
        bills={[{
            title: 'Hello World',
            start: new Date(),
            end: new Date(),
            lastPaid: new Date(),
        }]}
        categories={categories}
        categorySortID={-1}
    />);

    const event = screen.getByText(/Hello World/);
    expect(event.parentElement).toHaveClass('paid');
});

test('Sums total of bills', () => {
    const categories = [
        {
            name: 'All',
            id: -1,
        },
    ];

    const bills = [];
    for (let i = 0; i < 10; i++) {
        bills.push({
            title: 'Hello World',
            start: new Date(),
            end: new Date(),
            amount: Math.floor(Math.random() * 100),
        });
    }

    render(<BigCalendar
        bills={bills}
        categories={categories}
        categorySortID={-1}
    />);


    const sum = bills.reduce((acc, bill) => acc + bill.amount, 0);
    const checkContent = screen.getByTestId('billSum');
    expect(checkContent).toHaveTextContent(`$${sum} / month`);
});

test('Do not sum bills that no longer recur', () => {
    const categories = [
        {
            name: 'All',
            id: -1,
        },
    ];

    render(<BigCalendar
        bills={[{
            title: 'Hello World',
            start: new Date(0),
            end: new Date(0),
            amount: 100,
        }]}
        categories={categories}
        categorySortID={-1}
    />);


    const checkContent = screen.getByTestId('billSum');
    expect(checkContent).toHaveTextContent('$0 / month');
});

test('Events from Bills Exact Dates', () => {
    const bills = [{
        title: 'Hello World',
        start: new Date(Date.parse('01 Jan 2022')),
        end: new Date(Date.parse('01 December 2022')),
        amount: 100,
    }];

    const events = getEventsFromBills(bills);
    expect(events).toHaveLength(12);
});

test('Events from Bills Cutoff', () => {
    const bills = [{
        title: 'Hello World',
        start: new Date(Date.parse('01 Jan 2022')),
        end: new Date(Date.parse('30 November 2022')),
        amount: 100,
    }];


    const events = getEventsFromBills(bills);
    expect(events).toHaveLength(11);
});