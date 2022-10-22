import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import "react-big-calendar/lib/css/react-big-calendar.css";
import '../App.css';

const localizer = momentLocalizer(moment)

const myEventsList = [
    {
        title: 'Weekend',
        start: new Date(),
        end: new Date(moment().add(1, 'days'))
    }
];

function handleCalendarClick(e) {
    e.preventDefault();
    if (e.target.classList.contains('rbc-event-content')) {
        console.log('Event Clicked');

        // Open modal

    }
}

const BigCalendar = (props) => (
    <main className='flex bg-orange-200 h-9/10'>
        <div className='grid container m-auto h-4/5 bg-yellow-200 flex-1'>
            <span onClick={handleCalendarClick}>
                <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </span>
        </div>
    </main>
)
export default BigCalendar;