/* eslint-disable no-mixed-operators */
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import EdittableText from './EdittableText';
import 'react-circular-progressbar/dist/styles.css';
import Dropdown from 'react-dropdown';
import { sendRequest } from '../common/Requests';

function Budget(props) {
    function lerpColor(a, b, price) {
        const bounded = Math.min(Math.max(price, 0), 1);

        const ah = parseInt(a.replace(/#/g, ''), 16),
            ar = ah >> 16,
            ag = (ah >> 8) & 0xff,
            ab = ah & 0xff,
            bh = parseInt(b.replace(/#/g, ''), 16),
            br = bh >> 16,
            bg = (bh >> 8) & 0xff,
            bb = bh & 0xff,
            rr = ar + bounded * (br - ar),
            rg = ag + bounded * (bg - ag),
            rb = ab + bounded * (bb - ab);

        return (
            '#' +
            (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0)
                .toString(16)
                .slice(1)
        );
    }

    const budget = props.budget;
    const ratio = (props.budget.actualPrice / props.budget.expectedPrice) * 100;
    const percent = Math.round(ratio * 100) / 100;

    // Lerp color from green to red
    const red = '#f74f31';
    const green = '#7aff75';
    const color = lerpColor(green, red, percent / 100);

    function editMe() {
        sendRequest(
            'EditBudget',
            { ...budget, userId: props.user.userId },
            () => {
                props.setBudgets(
                    props.budgets.map((b) => (b.id === budget.id ? budget : b))
                );
            },
            (err) => {
                console.log(err);
            }
        );
    }

    return (
        <div className="grid grid-cols-1 w-[232px] p-4">
            <span className="flex justify-between relative">
                <EdittableText
                    id={`${budget.id}-name`}
                    type="text"
                    value={budget.name}
                    onChange={(e) => {
                        budget.name = e.target.value;
                        props.setBudgets([...props.budgets]);
                    }}
                    onBlur={editMe}
                />

                <input
                    className="absolute -top-2 right-0 cursor-pointer text-[24px] font-bold hover:text-red-500"
                    type="button"
                    value="&times;"
                    onClick={() => props.deleteBudget(budget)}
                />
            </span>
            <span className="w-[200px] h-[200px]">
                <CircularProgressbar
                    styles={buildStyles({ pathColor: color })}
                    value={percent}
                    text={`${percent}%`}
                />
            </span>

            <span className="m-auto flex">
                <h3 className="font-bold">$</h3>
                <EdittableText
                    id={`${budget.id}-actual`}
                    type="number"
                    value={budget.actualPrice}
                    max={budget.expectedPrice}
                    onChange={(e) => {
                        budget.actualPrice = +e.target.value;
                        props.setBudgets([...props.budgets]);
                    }}
                    onBlur={editMe}
                />
                <p className="mx-1 my-px p-0">out of</p>
                <h3 className="font-bold">$</h3>
                <EdittableText
                    id={`${budget.id}-expected`}
                    type="number"
                    value={budget.expectedPrice}
                    onChange={(e) => {
                        budget.expectedPrice = +e.target.value;
                        props.setBudgets([...props.budgets]);
                    }}
                    onBlur={editMe}
                />
            </span>

            <Dropdown
                options={props.categories.map((category) => category.name)}
                value={
                    props.categories.find((c) => c.id === budget.categoryId)
                        ?.name
                }
                onChange={(e) => {
                    budget.categoryId = props.categories.find(
                        (c) => c.name === e.value
                    )?.id;
                    editMe();
                }}
                className="slim-parent border-2 border-black rounded-md"
                controlClassName="slim"
                placeholderClassName="slim"
            />
        </div>
    );
}

export default Budget;
