import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Modal from 'react-modal';
import CreateEvent from './CreateEvent';
import CalendarControls from './CalendarControls';

import "react-big-calendar/lib/css/react-big-calendar.css";
import '../App.css';

const localizer = momentLocalizer(moment)

function BigCalendar(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [start, setStart] = React.useState(formatDate(new Date()));
    const [currentEvent, setCurrentEvent] = React.useState(null);

    function formatDate(date) {
        // return date.toISOString().split('T')[0];
        // return date;
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
    }


    function handleCalendarClick(e) {
        e.preventDefault();
        if (e.target.classList.contains('rbc-event-content')) {
            const event = props.events.find(event => event.title === e.target.innerHTML);
            createEdit(event);
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

        setIsEdit(false);
        setTitle('');
        setStart(formatDate(new Date()));
        setCurrentEvent(null);
    }

    function createEdit(event) {
        setIsEdit(true);

        console.log(event);

        setTitle(event.title);
        setStart(formatDate(event.start));
        setCurrentEvent(event);

        openModal();
    }

    function createNew() {
        setIsEdit(false);
        setTitle('');
        setStart(formatDate(new Date()));
        setCurrentEvent(null);

        openModal();
    }

    function pushEvent(event) {
        props.modifyEvents(event, currentEvent);
        setCurrentEvent(null);
    }

    return (
        <div className='flex h-9/10 mb-5'>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <CreateEvent
                    events={props.events}
                    edit={isEdit}
                    title={title}
                    start={start}
                    setTitle={setTitle}
                    setStart={setStart}
                    closeModal={closeModal}
                    pushEvent={pushEvent}
                />
            </Modal>

            <div className='grid container m-auto h-calendar flex-1'>
                <section className='flex flex-col'>
                    <CalendarControls
                        createBill={createNew}
                        events={props.events}
                    />
                    <span className='grid container m-auto h-4/5 flex-1 bg-yellow-200 p-3 rounded-md'
                        onClick={handleCalendarClick}>
                        <Calendar
                            localizer={localizer}
                            events={props.events}
                            startAccessor="start"
                            endAccessor="end"
                        />
                    </span>
                </section>
            </div>

        </div>
    );
}
export default BigCalendar;