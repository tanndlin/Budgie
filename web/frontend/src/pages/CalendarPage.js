import React from 'react';
import Header from '../components/Header';
import BigCalendar from '../components/Calendar';
import BudgetsView from '../components/BudgetsView';

// TODO: Calendar overflows onto budget on differnet views

function CalendarPage() {
    const [events, setEvents] = React.useState([]);

    // Does both operations because 2 setstates overwrite each other
    function modifyEvents(add, remove) {
        if (remove) {
            setEvents([...events.filter((e) => e !== remove), add]);
        } else {
            setEvents([...events, add]);
        }
    }

    return (
        <div className="h-screen">
            <Header />
            <main className="bg-orange-200 min-h-minus-header">
                <BigCalendar events={events} modifyEvents={modifyEvents} />

                <BudgetsView />
            </main>
        </div>
    );
}

export default CalendarPage;
