import React from 'react';

function Bill(props) {
    function handleClick(e) {
        e.preventDefault();
        // If it was a Ctrl + Click
        if (!e.ctrlKey) return;

        const editState = () => {
            const newState = props.bills.map(bill => {
                if (bill.title === props.bill.title)
                    return {
                        ...bill, resources: {
                            paid: !bill.resources.paid
                        }
                    };

                return bill;

            });

            props.setBills(newState);
        };

        editState();
    }

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

    const className = 'p-2 rounded-md ' + (props.bill.resources.paid ? 'paid' : 'unpaid');

    return (
        <div onClick={handleClick} className={className}>
            <h1 className="text-2xl font-bold">{props.bill.title}</h1>
            <p className="text-xl font-bold">${props.bill.amount}</p>
            <p className="text-xl font-bold">{getDayString(props.bill.start.getDate())}</p>
        </div>
    );
}

export default Bill;