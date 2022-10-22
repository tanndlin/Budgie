import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Modal from 'react-modal';

import "react-big-calendar/lib/css/react-big-calendar.css";
import '../App.css';
import CreateEvent from './CreateEvent';

const localizer = momentLocalizer(moment)

function BigCalendar(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function handleCalendarClick(e) {
        e.preventDefault();
        if (e.target.classList.contains('rbc-event-content')) {
            console.log('Event Clicked');

            openModal()
        }
    }


    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            zIndex: '1000',
        },
        content: {
            width: '50%',
            height: '50%',
            margin: 'auto',
            display: 'flex',
        }
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <main className='flex bg-orange-200 h-9/10'>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <CreateEvent
                    events={props.events}
                    closeModal={closeModal} />
            </Modal>
            <div className='grid container m-auto h-4/5 bg-yellow-200 flex-1'>
                <span onClick={handleCalendarClick}>
                    <Calendar
                        localizer={localizer}
                        events={props.events}
                        startAccessor="start"
                        endAccessor="end"
                    />
                </span>

            </div>
        </main>
    );
}
export default BigCalendar;