import React from 'react';
import Budget from './Budget';

function BudgetsView(props) {
    return (
        <article className="m-auto container bg-yellow-200 p-3 mb-5 rounded-md">
            <h1 className="text-2xl font-bold border-black border-b-2 p-1">Budgets</h1>
            <section id="budgetView" className="grid gap-16 justify-center p-16">
                {props.budgets.map((budget) => (
                    <Budget
                        budget={budget}
                        budgets={props.budgets}
                        setBudgets={props.setBudgets}
                    />
                ))}
            </section>
        </article>
    );
}

export default BudgetsView;
