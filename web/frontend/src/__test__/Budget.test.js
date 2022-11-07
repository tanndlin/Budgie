import { render, screen } from '@testing-library/react';
import BudgetsView from '../components/BudgetsView';

test('Sums total of Budgets', () => {
    const budgets = [];
    for (let i = 0; i < 10; i++) {
        const total = Math.floor(Math.random() * 100);
        budgets.push({
            name: 'Hello World',
            total,
            spent: Math.floor(Math.random() * total),
        });
    }

    render(<BudgetsView
        budgets={budgets}
    />);


    const sum = budgets.reduce((acc, budget) => acc + budget.total, 0);
    const event = screen.getByText(new RegExp(`${sum}`));
    expect(event).toBeInTheDocument();
});

test('Sums spent of Budget', () => {
    const budgets = [];
    for (let i = 0; i < 10; i++) {
        const total = Math.floor(Math.random() * 100);
        budgets.push({
            name: 'Hello World',
            total,
            spent: Math.floor(Math.random() * total),
        });
    }

    render(<BudgetsView
        budgets={budgets}
    />);


    const sum = budgets.reduce((acc, budget) => acc + budget.spent, 0);
    const event = screen.getByText(new RegExp(`${sum}`));
    expect(event).toBeInTheDocument();
});