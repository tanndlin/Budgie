import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


// TOOD: Change color of progress bar based on percentage
// TODO: Add ability to add/sub from spent budget
function BudgetsView() {

    const [budgets, setBudgets] = React.useState([
        {
            name: "Groceries",
            spent: 100,
            total: 200,
        },
        {
            name: "Gas",
            spent: 80,
            total: 100,
        },
    ]);

    return (
        <article className='m-auto container bg-yellow-200 p-3 mb-5 rounded-md'>
            <h1 className='text-2xl font-bold border-black border-b-2 p-1'>Budgets</h1>
            <section className='flex flex-cols gap-x-16 p-16'>

                {
                    budgets.map((budget) => {
                        const percent = (budget.spent / budget.total) * 100;

                        return (
                            <div className='grid grid-cols-1'>
                                <h2 className='text-xl font-bold'>{budget.name}</h2>
                                <span style={{ width: 200, height: 200 }}>
                                    <CircularProgressbar value={percent} text={`${percent}%`} />
                                </span>
                            </div>
                        );
                    })
                }

            </section>
        </article>
    );
}

export default BudgetsView;