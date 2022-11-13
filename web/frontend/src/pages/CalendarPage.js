import React from 'react';
import BigCalendar from '../components/Calendar';
import BudgetsView from '../components/BudgetsView';
import ExtraneousView from '../components/ExtraneousView';
import BackgroundImage from '../img/divider.jpg';

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
        <div className=''>
            <img className='fixed h-full w-full opacity-70 object-fill' src={BackgroundImage} alt='Background image' />
            <div className="fixed h-full w-full object-fill overflow-y-auto snap-x scroll-smooth">
                <div className='snap-end'>
                    <BigCalendar bills={props.bills} modifyEvents={modifyEvents} />
                </div>
                <div className='snap-end'>
                    <BudgetsView
                        budgets={props.budgets}
                        setBudgets={props.setBudgets}
                    />
                </div>
                <div className='snap-end'>
                    <ExtraneousView
                        extras={props.extras}
                        setExtras={props.setExtras}
                    />
                </div>
            </div>
        </div>
    );
}

export default CalendarPage;
