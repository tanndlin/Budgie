import React from 'react';

function Bill(props) {
    const className = 'p-2 rounded-md' + (props.bill.resources.paid ? ' paid' : ' unpaid');

    return (
        <div className={className}>
            <h1 className="text-2xl font-bold">{props.bill.title}</h1>
            <p className="text-xl font-bold">${props.bill.amount}</p>
            <p className="text-xl font-bold">{props.bill.start.toISOString()}</p>
        </div>
    );
}

export default Bill;