import React from 'react';
import BudgetsView from '../components/BudgetsView';
import ListView from '../components/ListView';

function ListPage(props) {
    if (props.user === null) {
        // Check url for localId
        const url = new URL(window.location.href);
        const localId = url.searchParams.get('user');
        if (localId) {
            // If localId is found, set user to localId
            props.setUser(localId);

            // TODO: Hydrate bills and budgets
        } else {
            // If localId is not found, redirect to login page
            window.location.href = '/';
        }
    }

    function modifyEvents(add, remove) {
        if (remove) {
            props.setBills([...props.bills.filter((e) => e !== remove), add]);
        } else {
            props.setBills([...props.bills, add]);
        }
    }

    return (
        <div className="h-minus-header min-h-minus-header">
            <main className='min-h-full'>
                <ListView
                    bills={props.bills}
                    setBills={props.setBills}
                    budgets={props.budgets}
                    setBudgets={props.setBudgets}
                    modifyEvents={modifyEvents}
                />

                <BudgetsView
                    budgets={props.budgets}
                    setBudgets={props.setBudgets}
                />
            </main>
        </div>
    );
}

export default ListPage;