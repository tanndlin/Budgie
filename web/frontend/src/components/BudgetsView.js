import React from 'react';
import Budget from './Budget';

function BudgetsView(props) {
    function newBudget() {
        const budget = {
            name: 'New Budget',
            total: 100,
            spent: 0,
        };

        props.setBudgets([...props.budgets, budget]);
    }

    function resetBudgets() {
        props.setBudgets(props.budgets.map(b => { return { ...b, spent: 0 } }));
    }

    return (
        <article className="m-auto container bg-[#BBE9E7] bg-opacity-50 p-3 mb-5 rounded-md">
            <div className="flex flex-row justify-between font-bold border-black border-b-2 p-1">
                <h1 className="text-2xl">Budgets</h1>
                <span className='text-md'>
                    <h2 className=''>{
                        `Total:  $${Object.entries(props.budgets)
                            .reduce((acc, [key, budget]) =>
                                acc + +budget.total, 0)}
                            / month`
                    }</h2>
                    <h2 className=''>{
                        `Spent: $${Object.entries(props.budgets)
                            .reduce((acc, [key, budget]) =>
                                acc + +budget.spent, 0)}
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
            <footer className='border-black border-t-2 p-1 flex flex-row gap-4'>
                <input className='px-2 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md' type='button' value='Add Budget'
                    onClick={newBudget} />
                <input className='px-2 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md' type='button' value='Reset Budgets'
                    onClick={resetBudgets} />
            </footer>
        </article>
    );
}

export default BudgetsView;
