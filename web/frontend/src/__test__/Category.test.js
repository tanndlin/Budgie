import { render, screen } from '@testing-library/react';
import BigCalendar from '../components/Calendar';

test('Shows all unfiltered', () => {
    const categories = [
        {
            name: 'All',
            id: -1,
        },
        {
            name: 'Food',
            id: 1,
        }
    ];

    const bills = [{
        title: 'Bill 1',
        amount: 100,
        categoryID: -1,
        start: new Date(),
        end: new Date(),
    },
    {
        title: 'Bill 2',
        amount: 200,
        categoryID: 1,
        start: new Date(),
        end: new Date(),
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
            id: -1,
        },
        {
            name: 'Food',
            id: 1,
        },
        {
            name: 'Utilities',
            id: 2,
        }
    ];

    const bills = [{
        title: 'Bill 1',
        amount: 100,
        categoryID: -1,
        start: new Date(),
        end: new Date(),
    },
    {
        title: 'Bill 2',
        amount: 200,
        categoryID: 1,
        start: new Date(),
        end: new Date(),
    },
    {
        title: 'Bill 3',
        amount: 300,
        categoryID: 2,
        start: new Date(),
        end: new Date(),
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