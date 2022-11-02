import React from 'react';
import Budget from './Budget';
import BudgetControls from './BudgetControls';

function BudgetsView(props) {
    function newBudget(budget) {
        props.setBudgets([...props.budgets, budget]);
    }

    return (
        <div className='flex flex-col container m-auto'>
            <BudgetControls
                budgets={props.budgets}
                newBudget={newBudget}
            />
            <section className="m-auto container bg-yellow-200 p-3 mb-5 rounded-md">
                <div className="flex flex-row justify-between font-bold border-black border-b-2 p-1">
                    <h1 className="text-2xl">Budgets</h1>
                    <span className='text-md'>
                        <h2 className=''>{
                            `Total:  $${Object.entries(props.budgets)
                                .reduce((acc, [key, budget]) =>
                                    acc + Number(budget.total), 0)}
                            / month`
                        }</h2>
                        <h2 className=''>{
                            `Spent: $${Object.entries(props.budgets)
                                .reduce((acc, [key, budget]) =>
                                    acc + Number(budget.spent), 0)}
                            / month`
                        }</h2>
                    </span>
                </div>
                <section id="budgetView" className="grid gap-16 justify-center p-16">
                    {props.budgets.map((budget) => (
                        <Budget
                            budget={budget}
                            budgets={props.budgets}
                            setBudgets={props.setBudgets}
                        />
                    ))}
                </section>
            </section>
        </div>
    );
}

export default BudgetsView;
