import React from 'react';

function Bill(props) {
    return (
        <div className="bg-white p-3 rounded-md">
            <h1 className="text-2xl font-bold">{props.bill.name}</h1>
            <p className="text-xl font-bold">${props.bill.amount}</p>
            <p className="text-xl font-bold">{props.bill.start}</p>
        </div>
    );
}

export default Bill;