import React from 'react';
import BigCalendar from '../components/Calendar';
import BudgetsView from '../components/BudgetsView';
import BackgroundImage from '../img/divider.jpg';

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
            </div>
        </div>
    );
}

export default CalendarPage;
