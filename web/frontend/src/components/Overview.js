import React from 'react';

function Overview(props) {
    const sumOfBills = () => {
        return props.bills.reduce((acc, bill) => {
            return acc + bill.price;
        }, 0);
    };

    const sumOfActual = () => {
        return props.budgets.reduce((acc, budget) => {
            return acc + budget.actualPrice;
        }, 0);
    };

    const sumOfExpected = () => {
        return props.budgets.reduce((acc, budget) => {
            return acc + budget.expectedPrice;
        }, 0);
    };

    const sumOfOneOffs = () => {
        return props.extras.reduce((acc, oneOff) => {
            return acc + oneOff.price;
        }, 0);
    };

    const total = () => {
        return sumOfBills() + sumOfActual() + sumOfOneOffs();
    };

    const getColor = (a, b) => {
        return a > b ? 'text-red-700' : 'text-green-700';
    };

    return (
        <section className="grid grid-flow-row gap-4 pl-6">
            <h2 className="text-2xl w-full text-center ">Overview</h2>
            <span>
                <h3 className="text-xl">Sum of Bills</h3>
                <p>
                    <b>{`$${sumOfBills()}`}</b>
                </p>
            </span>

            <span>
                <h3 className="text-xl">Sum of Budgets</h3>
                <p
                    className={`inline ${getColor(
                        sumOfActual(),
                        sumOfExpected()
                    )}`}
                >
                    <b>{`$${sumOfActual()}`}</b>
                </p>
                <p className="inline">
                    <b>{` / $${sumOfExpected()}`}</b>
                </p>
            </span>

            <span>
                <h3 className="text-xl">Sum of One Offs</h3>
                <p>
                    <b>{`$${sumOfOneOffs()}`}</b>
                </p>
            </span>

            <span>
                <h3 className="text-xl">Total vs Income</h3>
                <p
                    className={`inline ${getColor(
                        total(),
                        props.user.expectedIncome
                    )}`}
                >
                    <b>{`$${total()}`}</b>
                </p>
                <p className="inline">
                    <b>{` / $${props.user.expectedIncome}`}</b>
                </p>
            </span>
        </section>
    );
}

export default Overview;
