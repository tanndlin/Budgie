import React from 'react';
import Header from '../components/Header';
import BigCalendar from '../components/Calendar';

function CalendarPage() {
    const [events, setEvents] = React.useState([]);


    // Does both operations because 2 setstates overwrite each other
    function modifyEvents(add, remove) {
        if (remove) {
            setEvents([...events.filter(e => e !== remove), add]);
        } else {
            setEvents([...events, add]);
        }
    }

    return (
        <div className='h-screen'>
            <Header />
            <main className='bg-orange-200 h-9/10'>
                <BigCalendar
                    events={events}
                    modifyEvents={modifyEvents}
                />
            </main>
        </div>
    );
};

export default CalendarPage;