import React from 'react';

function Bill(props) {
    const nth = function (d) {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    const getDayString = (d) => {
        const suffix = nth(d);

        return `${d}${suffix} of every month`;
    }

    const className = 'p-2 rounded-md' + (props.bill.resources.paid ? ' paid' : ' unpaid');

    return (
        <div className={className}>
            <h1 className="text-2xl font-bold">{props.bill.title}</h1>
            <p className="text-xl font-bold">${props.bill.amount}</p>
            <p className="text-xl font-bold">{getDayString(props.bill.start.getDate())}</p>
        </div>
    );
}

export default Bill;