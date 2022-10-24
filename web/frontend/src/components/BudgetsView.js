/* eslint-disable no-mixed-operators */
import React from 'react';
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


// TODO: Add ability to add/sub from spent budget
function BudgetsView() {
    function lerpColor(a, b, amount) { 

        var ah = parseInt(a.replace(/#/g, ''), 16),
            ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
            bh = parseInt(b.replace(/#/g, ''), 16),
            br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
            rr = ar + amount * (br - ar),
            rg = ag + amount * (bg - ag),
            rb = ab + amount * (bb - ab);

        return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}


    const [budgets, setBudgets] = React.useState([
        {
            name: "Clothes",
            spent: 10,
            total: 200,
        },
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
                        
                        // Lerp color from green to red
                        const red = '#f74f31';
                        const green = '#7aff75';
                        const color = lerpColor(green, red, percent / 100);

                        console.log(color);

                        return (
                            <div className='grid grid-cols-1'>
                                <h2 className='text-xl font-bold'>{budget.name}</h2>
                                <span style={{ width: 200, height: 200 }}>
                                    <CircularProgressbar styles={buildStyles({pathColor:color})} value={percent} text={`${percent}%`} />
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