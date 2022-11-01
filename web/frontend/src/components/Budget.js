/* eslint-disable no-mixed-operators */
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import EdittableText from './EdittableText';
import 'react-circular-progressbar/dist/styles.css';


function Budget(props) {
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

    const budget = props.budget;
    const ratio = (props.budget.spent / props.budget.total) * 100;
    const percent = Math.round(ratio * 100) / 100;


    // Lerp color from green to red
    const red = '#f74f31';
    const green = '#7aff75';
    const color = lerpColor(green, red, percent / 100);


    return (
        <div className='grid grid-cols-1'>
            <EdittableText
                value={budget.name}
                onChange={(e) => {
                    budget.name = e.target.value;
                    props.setBudgets([...props.budgets]);
                }}
            />
            <span style={{ width: 200, height: 200 }}>
                <CircularProgressbar styles={buildStyles({ pathColor: color })} value={percent} text={`${percent}%`} />
            </span>
            <span className='m-auto flex'>
                <h3 className='font-bold'>$</h3>
                <EdittableText
                    value={budget.spent}
                    max={budget.total}
                    onChange={(e) => {
                        budget.spent = e.target.value;
                        props.setBudgets([...props.budgets]);
                    }}
                />
                <p className='mx-1 my-px p-0'>out of</p>
                <h3 className='font-bold'>$</h3>
                <EdittableText
                    value={budget.total}
                    onChange={(e) => {
                        budget.total = e.target.value;
                        props.setBudgets([...props.budgets]);
                    }}
                />
            </span>
        </div>
    );
}

export default Budget;