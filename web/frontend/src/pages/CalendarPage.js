import React from 'react';
import { useState, useEffect } from 'react';
import BigCalendar from '../components/Calendar';
import BudgetsView from '../components/BudgetsView';
import ExtraneousView from '../components/ExtraneousView';
import BackgroundImage from '../img/divider_v2.jpg';

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

    const backgroundImage = 'fixed h-full w-full opacity-70 object-fill';
    let [backgroundToggle, setBackgroundToggle] = useState(() => {
        const saved = localStorage.getItem("backgroundToggle");
        const initialValue = JSON.parse(saved);
        return initialValue || null;
    });
    const ChangeBackgroundToggle = () => {
        if (backgroundToggle == null) {
            setBackgroundToggle(true);
        } else if (backgroundToggle == false) {
            setBackgroundToggle(true);
        } else {
            // backgroundToggle == true
            setBackgroundToggle(false);
        }
        return backgroundToggle;
    };
    useEffect(() => {
        localStorage.setItem("backgroundToggle", JSON.stringify(backgroundToggle))
    }, [backgroundToggle]);

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
            { !backgroundToggle && (
                <img className={backgroundImage} src={BackgroundImage} alt='Wooden Texture' />
            )}
            <div className="fixed h-full w-full overflow-y-auto snap-x scroll-smooth">
                <div className='mt-5 max-w-[175px] m-auto bg-[#BBE9E7] bg-opacity-90 p-3 rounded-md'>
                    <input className='font-bold text-center hover:text-[#189DFD]' type='button' value='Background Toggle'
                        onClick={() => ChangeBackgroundToggle()} />
                </div>
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
