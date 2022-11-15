import { render, screen } from '@testing-library/react';
import { BigCalendar } from '../components/Calendar';
import React from 'react';

test('Shows all unfiltered', () => {
    const categories = [
        {
            name: 'All',
            id: -1
        },
        {
            name: 'Food',
            id: 1
        }
    ];

    const bills = [
        {
            name: 'Bill 1',
            price: 100,
            categoryId: -1,
            startDate: new Date(),
            endDate: new Date()
        },
        {
            name: 'Bill 2',
            price: 200,
            categoryId: 1,
            startDate: new Date(),
            endDate: new Date()
        }
    ];

    render(<BigCalendar {...{ bills, categories, categorySortID: -1 }} />);

    const allBill = screen.getByText('Bill 1 - 100');
    expect(allBill).toBeInTheDocument();

    const foodBill = screen.getByText('Bill 2 - 200');
    expect(foodBill).toBeInTheDocument();
});

test('Shows only filtered', () => {
    const categories = [
        {
            name: 'All',
            id: -1
        },
        {
            name: 'Food',
            id: 1
        },
        {
            name: 'Utilities',
            id: 2
        }
    ];

    const bills = [
        {
            name: 'Bill 1',
            price: 100,
            categoryId: -1,
            startDate: new Date(),
            endDate: new Date()
        },
        {
            name: 'Bill 2',
            price: 200,
            categoryId: 1,
            startDate: new Date(),
            endDate: new Date()
        },
        {
            name: 'Bill 3',
            price: 300,
            categoryId: 2,
            startDate: new Date(),
            endDate: new Date()
        }
    ];

    render(<BigCalendar {...{ bills, categories, categorySortID: -1 }} />);

    const allBill = screen.getByText('Bill 1 - 100');
    expect(allBill).toBeInTheDocument();

    const foodBill = screen.getByText('Bill 2 - 200');
    expect(foodBill).toBeInTheDocument();

    const utilitiesBill = screen.getByText('Bill 3 - 300');
    expect(utilitiesBill).toBeInTheDocument();
});
