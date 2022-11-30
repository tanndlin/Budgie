import React from 'react';

export function Overview(props) {
    const total = () => {
        return (
            sumKeyOfElement(props.bills, 'price') +
            sumKeyOfElement(props.budgets, 'actualPrice') +
            sumKeyOfElement(props.extras, 'price')
        );
    };

    const expectedExpenses = () => {
        return (
            sumKeyOfElement(props.bills, 'price') +
            sumKeyOfElement(props.budgets, 'expectedPrice') +
            sumKeyOfElement(props.extras, 'price')
        );
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
            <h2 className="text-2xl w-full text-center font-bold">Overview</h2>
            <OverviewSection title="Sum Of Bills">
                <p>
                    <b>{`$${sumKeyOfElement(props.bills, 'price')}`}</b>
                </p>
            </OverviewSection>

            <OverviewSection title="Sum of Budgets">
                <p
                    className={`inline ${getColor(
                        sumKeyOfElement(props.budgets, 'actualPrice'),
                        sumKeyOfElement(props.budgets, 'expectedPrice')
                    )}`}
                >
                    <b>{`$${sumKeyOfElement(props.budgets, 'actualPrice')}`}</b>
                </p>
                <p className="inline">
                    <b>{` / $${sumKeyOfElement(
                        props.budgets,
                        'expectedPrice'
                    )}`}</b>
                </p>
            </OverviewSection>

            <OverviewSection title="Sum of One Offs">
                <p>
                    <b>{`$${sumKeyOfElement(props.extras, 'price')}`}</b>
                </p>
            </OverviewSection>

            <OverviewSection title="Expected Expenses vs Income">
                <p className="inline">
                    <b>{`$${expectedExpenses()}`}</b>
                </p>
                <p className="inline">
                    <b>{` / $${props.user.expectedIncome}`}</b>
                </p>
            </OverviewSection>

            <OverviewSection title="Actual Expenses vs Income">
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

export const sumKeyOfElement = (arr, key, categoryId) => {
    const sum = (arr, key) => {
        return arr.reduce((sum, item) => sum + +item[key], 0);
    };

    return sum(
        arr.filter(
            (e) => (categoryId && e.categoryId === categoryId) || !categoryId
        ),
        key
    );
};
