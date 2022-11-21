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

    const OverviewSection = (props) => {
        return (
            <span className="p-2 bg-[#b2c6ec] bg-opacity-[.7] rounded-md shadow-lg expand">
                <h3 className="text-xl">{props.title}</h3>
                {props.children}
            </span>
        );
    };

    return (
        <section className="flex flex-col gap-4 mx-6">
            <h2 className="text-2xl w-full text-center ">Overview</h2>
            <OverviewSection title="Sum Of Bills">
                <p>
                    <b>{`$${sumOfBills()}`}</b>
                </p>
            </OverviewSection>

            <OverviewSection title="Sum of Budgets">
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
            </OverviewSection>

            <OverviewSection title="Sum of One Offs">
                <p>
                    <b>{`$${sumOfOneOffs()}`}</b>
                </p>
            </OverviewSection>

            <OverviewSection title="Total vs Income">
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
            </OverviewSection>
        </section>
    );
}

export default Overview;
