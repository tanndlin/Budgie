import React from 'react';
import Budget from './Budget';
import { sendRequest } from '../common/Requests';

function BudgetsView(props) {
    function newBudget() {
        const budget = {
            name: 'New Budget',
            categoryId: -1,
            expectedPrice: 100,
            actualPrice: 0,
            startDate: new Date().setDate(1),
            recurrence: 'monthly'
        };

        sendRequest(
            'CreateBudget',
            { ...budget, userId: props.user.userId },
            (res) => {
                const { budget } = JSON.parse(res.responseText);
                props.setBudgets([...props.budgets, budget]);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    function deleteBudget(budget) {
        sendRequest(
            'RemoveBudget',
            {
                userId: props.user.userId,
                budgetId: budget.budgetId
            },
            () => {
                props.setBudgets([
                    ...props.budgets.filter(
                        (b) => b.budgetId !== budget.budgetId
                    )
                ]);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    function resetBudgets() {
        props.setBudgets(
            props.budgets.map((b) => {
                return { ...b, spent: 0 };
            })
        );
    }

    return (
        <article className="m-auto container bg-[#BBE9E7] bg-opacity-50 p-3 mb-5 rounded-md">
            <div className="flex flex-row justify-between font-bold border-black border-b-2 p-1">
                <h1 className="text-2xl">Budgets</h1>
                <span className="text-md">
                    <h2 className="">{`Total:  $${Object.entries(
                        props.budgets
                    ).reduce(
                        (acc, [_key, budget]) => acc + +budget.expectedPrice,
                        0
                    )}
                            / month`}</h2>
                    <h2 className="">{`Spent: $${Object.entries(
                        props.budgets
                    ).reduce(
                        (acc, [_key, budget]) => acc + +budget.actualPrice,
                        0
                    )}
                            / month`}</h2>
                </span>
            </div>
            <section
                id="budgetView"
                className="grid gap-16 justify-center p-16"
            >
                {props.budgets
                    .filter((budget) => {
                        if (
                            props.categorySortID === -1 ||
                            budget.categoryId === -1
                        ) {
                            return true;
                        }

                        return budget.categoryId === props.categorySortID;
                    })
                    .map((budget) => (
                        <Budget
                            key={budget.budgetId}
                            user={props.user}
                            budget={budget}
                            budgets={props.budgets}
                            setBudgets={props.setBudgets}
                            categories={props.categories}
                            deleteBudget={deleteBudget}
                        />
                    ))}
            </section>
            <footer className="border-black border-t-2 p-1 flex flex-row gap-4">
                <input
                    className="px-2 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md"
                    type="button"
                    value="Add Budget"
                    onClick={newBudget}
                />
                <input
                    className="px-2 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md"
                    type="button"
                    value="Reset Budgets"
                    onClick={resetBudgets}
                />
            </footer>
        </article>
    );
}

export default BudgetsView;
