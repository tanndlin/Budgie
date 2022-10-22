import React from 'react';
import Header from '../components/Header';
import Calendar from '../components/Calendar';

const CalendarPage = () => {
    return (
        <div className='h-screen'>
            <Header />
            <Calendar />
        </div>
    );
};

export default CalendarPage;