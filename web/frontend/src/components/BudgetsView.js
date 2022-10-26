import React from 'react';
import Budget from './Budget';

function BudgetsView() {
    const [budgets, setBudgets] = React.useState([
        {
            name: 'Clothes',
            spent: 10,
            total: 200,
        },
        {
            name: 'Groceries',
            spent: 100,
            total: 200,
        },
        {
            name: 'Gas',
            spent: 80,
            total: 100,
        },
        {
            name: 'Fuck You',
            spent: 100,
            total: 100,
        },
        {
            name: 'Fuck You',
            spent: 100,
            total: 100,
        },
        {
            name: 'Fuck You',
            spent: 100,
            total: 100,
        },
    ]);

    return (
        <article className="m-auto container bg-yellow-200 p-3 mb-5 rounded-md">
            <h1 className="text-2xl font-bold border-black border-b-2 p-1">Budgets</h1>
            <section id="budgetView" className="grid gap-16 justify-center p-16">
                {budgets.map((budget) => (
                    <Budget budget={budget} budgets={budgets} setBudgets={setBudgets} />
                ))}
            </section>
        </article>
    );
}

export default BudgetsView;
