import { render, screen } from '@testing-library/react';
import BudgetsView from '../components/BudgetsView';
import React from 'react';

test('Sums total of Budgets', () => {
    const categories = [
        {
            name: 'All',
            id: -1
        }
    ];

    const budgets = [];
    for (let i = 0; i < 10; i++) {
        const expectedPrice = Math.floor(Math.random() * 100);
        budgets.push({
            name: 'Hello World',
            expectedPrice,
            actualPrice: Math.floor(Math.random() * expectedPrice),
            categoryId: -1,
            budgetId: i
        });
    }

    render(
        <BudgetsView
            budgets={budgets}
            categories={categories}
            categorySortID={-1}
        />
    );

    const sum = budgets.reduce((acc, budget) => acc + budget.expectedPrice, 0);
    const event = screen.getByText(new RegExp(`${sum}`));
    expect(event).toBeInTheDocument();
});

test('Sums spent of Budget', () => {
    const categories = [
        {
            name: 'All',
            id: -1
        }
    ];

    const budgets = [];
    for (let i = 0; i < 10; i++) {
        const expectedPrice = Math.floor(Math.random() * 100);
        budgets.push({
            name: 'Hello World',
            expectedPrice,
            actualPrice: Math.floor(Math.random() * expectedPrice),
            categoryId: -1,
            budgetId: i
        });
    }

    render(
        <BudgetsView
            budgets={budgets}
            categories={categories}
            categorySortID={-1}
        />
    );

    const sum = budgets.reduce((acc, budget) => acc + budget.actualPrice, 0);
    const event = screen.getByText(new RegExp(`${sum}`));
    expect(event).toBeInTheDocument();
});
