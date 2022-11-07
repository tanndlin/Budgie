import React from 'react';
import BigCalendar from '../components/Calendar';
import BudgetsView from '../components/BudgetsView';

function CalendarPage(props) {
    // Does both operations because 2 setstates overwrite each other
    function modifyEvents(add, remove) {
        if (remove) {
            props.setBills([...props.bills.filter((e) => e !== remove), add]);
        } else {
            props.setBills([...props.bills, add]);
        }
    }

    return (
        <div className="h-screen">
            <main className="min-h-minus-header">
                <BigCalendar bills={props.bills} modifyEvents={modifyEvents} />

                <BudgetsView
                    budgets={props.budgets}
                    setBudgets={props.setBudgets}
                />
            </main>
        </div>
    );
}

export default CalendarPage;
