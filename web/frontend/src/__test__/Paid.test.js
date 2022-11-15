import { render, screen } from '@testing-library/react';
import { BigCalendar } from '../components/Calendar';
import React from 'react';

test('Ctrl Clicking toggles paid on Calendar', () => {
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
                    allDay: true,
                    resources: { paid: false },
                    price: 100,
                    isPaid: []
                }
            ]}
            categories={categories}
            categorySortID={-1}
        />
    );

    // Ctrl + Click on the bill
    const event = screen.getByText(/Hello World/);
    event.dispatchEvent(new MouseEvent('click', { ctrlKey: true }));
    expect(event).toHaveStyle('background-color: rgb(74 222 128) !important');
});

test('Ctrl Clicking toggles paid off Calendar', () => {
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
                    allDay: true,
                    resources: { paid: true },
                    price: 100,
                    isPaid: [new Date()]
                }
            ]}
            categories={categories}
            categorySortID={-1}
        />
    );

    // Ctrl + Click on the bill
    const event = screen.getByText(/Hello World/);
    event.dispatchEvent(new MouseEvent('click', { ctrlKey: true }));
    expect(event).toHaveStyle('background-color: rgb(248 113 113) !important');
});
