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
        const total = Math.floor(Math.random() * 100);
        budgets.push({
            name: 'Hello World',
            total,
            spent: Math.floor(Math.random() * total),
            categoryId: -1
        });
    }

    render(
        <BudgetsView
            budgets={budgets}
            categories={categories}
            categorySortID={-1}
        />
    );

    const sum = budgets.reduce((acc, budget) => acc + budget.total, 0);
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
        const total = Math.floor(Math.random() * 100);
        budgets.push({
            name: 'Hello World',
            total,
            spent: Math.floor(Math.random() * total),
            categoryId: -1
        });
    }

    render(
        <BudgetsView
            budgets={budgets}
            categories={categories}
            categorySortID={-1}
        />
    );

    const sum = budgets.reduce((acc, budget) => acc + budget.spent, 0);
    const event = screen.getByText(new RegExp(`${sum}`));
    expect(event).toBeInTheDocument();
});
