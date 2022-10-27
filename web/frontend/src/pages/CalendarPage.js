import React from 'react';
import Header from '../components/Header';
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
            <Header
                user={props.user}
                setUser={props.setUser}
                bills={props.bills}
                setBills={props.setBills}
                budgets={props.budgets}
                setBudgets={props.setBudgets}
            />
            <main className="bg-orange-200 min-h-minus-header">
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
