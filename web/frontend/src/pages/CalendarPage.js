import React from 'react';
import { BigCalendar } from '../components/Calendar';
import BudgetsView from '../components/BudgetsView';
import ExtraneousView from '../components/ExtraneousView';

function CalendarPage(props) {
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

    // Does both operations because 2 setstates overwrite each other
    function modifyEvents(add, remove) {
        if (remove) {
            add.id = remove.id;
            props.setBills([...props.bills.filter((e) => e !== remove), add]);
        } else {
            props.setBills([...props.bills, add]);
        }
    }

    return (
        <div className="h-screen">
            <main className="min-h-minus-header">
                <BigCalendar
                    bills={props.bills}
                    setBills={props.setBills}
                    modifyEvents={modifyEvents}
                    categories={props.categories}
                />

                <BudgetsView
                    budgets={props.budgets}
                    setBudgets={props.setBudgets}
                />

                <ExtraneousView
                    extras={props.extras}
                    setExtras={props.setExtras}
                />
            </main>
        </div>
    );
}

export default CalendarPage;
