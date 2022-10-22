import React from 'react';
import Header from '../components/Header';
import Calendar from '../components/Calendar';
import moment from 'moment';

function CalendarPage() {
    const myEventsList = [
        {
            title: 'Weekend',
            start: new Date(),
            end: new Date(moment().add(1, 'days'))
        }
    ];

    return (
        <div className='h-screen'>
            <Header />
            <Calendar events={myEventsList} />
        </div>
    );
};

export default CalendarPage;