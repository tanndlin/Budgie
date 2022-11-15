import { render, screen } from '@testing-library/react';
import { BigCalendar, getEventsFromBills } from '../components/Calendar';
import React from 'react';

test('Events red on unpaid', () => {
    const categories = [
        {
            name: 'All',
            id: -1
        }
    ];
    render(
        <BigCalendar
            bills={[
                {
                    name: 'Hello World',
                    startDate: new Date(),
                    endDate: new Date(),
                    lastPaid: null
                }
            ]}
            categories={categories}
            categorySortID={-1}
        />
    );

    const event = screen.getByText(/Hello World/);
    expect(event.parentElement).toHaveClass('unpaid');
});

test('Events green on paid', () => {
    const categories = [
        {
            name: 'All',
            id: -1
        }
    ];

    render(
        <BigCalendar
            bills={[
                {
                    name: 'Hello World',
                    startDate: new Date(),
                    endDate: new Date(),
                    lastPaid: new Date()
                }
            ]}
            categories={categories}
            categorySortID={-1}
        />
    );

    const event = screen.getByText(/Hello World/);
    expect(event.parentElement).toHaveClass('paid');
});

test('Sums total of bills', () => {
    const categories = [
        {
            name: 'All',
            id: -1
        }
    ];

    const bills = [];
    for (let i = 0; i < 10; i++) {
        bills.push({
            name: 'Hello World',
            startDate: new Date(),
            endDate: new Date(),
            price: Math.floor(Math.random() * 100)
        });
    }

    render(
        <BigCalendar
            bills={bills}
            categories={categories}
            categorySortID={-1}
        />
    );

    const sum = bills.reduce((acc, bill) => acc + bill.price, 0);
    const checkContent = screen.getByTestId('billSum');
    expect(checkContent).toHaveTextContent(`$${sum} / month`);
});

test('Do not sum bills that no longer recur', () => {
    const categories = [
        {
            name: 'All',
            id: -1
        }
    ];

    render(
        <BigCalendar
            bills={[
                {
                    name: 'Hello World',
                    startDate: new Date(0),
                    endDate: new Date(0),
                    price: 100
                }
            ]}
            categories={categories}
            categorySortID={-1}
        />
    );

    const checkContent = screen.getByTestId('billSum');
    expect(checkContent).toHaveTextContent('$0 / month');
});

test('Events from Bills Exact Dates', () => {
    const bills = [
        {
            name: 'Hello World',
            startDate: new Date(Date.parse('01 Jan 2022')),
            endDate: new Date(Date.parse('01 December 2022')),
            price: 100
        }
    ];

    const events = getEventsFromBills(bills);
    expect(events).toHaveLength(12);
});

test('Events from Bills Cutoff', () => {
    const bills = [
        {
            name: 'Hello World',
            startDate: new Date(Date.parse('01 Jan 2022')),
            endDate: new Date(Date.parse('30 November 2022')),
            price: 100
        }
    ];

    const events = getEventsFromBills(bills);
    expect(events).toHaveLength(11);
});
