import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


// TOOD: Change color of progress bar based on percentage
// TODO: Add ability to add/sub from spent budget
// TODO: Dynamically add progress bar components based on number of budgets
function BudgetsView() {
    return (
        <article className='m-auto container bg-yellow-200 p-3 mb-5 rounded-md'>
            <h1 className='text-2xl font-bold border-black border-b-2 p-1'>Budgets</h1>
            <section className='flex flex-cols gap-x-16 p-16'>
                <div className='grid grid-cols-1'>
                    <h2 className='text-xl font-bold'>Groceries</h2>
                    <span style={{ width: 200, height: 200 }}>
                        <CircularProgressbar value={66} text={`${66}%`} />
                    </span>
                </div>
                <div className='grid grid-cols-1'>
                    <h2 className='text-xl font-bold'>Eating out</h2>
                    <span style={{ width: 200, height: 200 }}>
                        <CircularProgressbar value={75} text={`${75}%`} />
                    </span>
                </div>
            </section>
        </article>
    );
}

export default BudgetsView;