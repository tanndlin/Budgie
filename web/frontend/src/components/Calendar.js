import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Modal from 'react-modal';
import CreateEvent from './CreateEvent';
import CalendarControls from './CalendarControls';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../App.css';

const localizer = momentLocalizer(moment);

function BigCalendar(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [start, setStart] = React.useState(formatDate(new Date()));
    const [currentBill, setCurrentBill] = React.useState(null);

    function formatDate(date) {
        // return date.toISOString().split('T')[0];
        // return date;
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    function handleCalendarClick(e) {
        e.preventDefault();
        if (e.target.classList.contains('rbc-event-content')) {
            const event = props.events.find((event) => event.title === e.target.innerHTML);
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
        },
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);

        setIsEdit(false);
        setTitle('');
        setStart(formatDate(new Date()));
        setCurrentBill(null);
    }

    function createEdit(event) {
        setIsEdit(true);

        setTitle(event.title);
        setStart(formatDate(event.start));
        setCurrentBill(event);

        openModal();
    }

    function createNew() {
        setIsEdit(false);
        setTitle('');
        setStart(formatDate(new Date()));
        setCurrentBill(null);

        openModal();
    }

    function pushEvent(event) {
        props.modifyEvents(event, currentBill);
        setCurrentBill(null);
    }

    function eventStyleGetter(event, start, end, isSelected) {
        return {
            className: event.resources.paid ? 'paid' : 'unpaid',
        };
    }

    return (
        <div className="flex min-h-9/10 mb-5">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <CreateEvent
                    events={props.bills}
                    edit={isEdit}
                    title={title}
                    start={start}
                    setTitle={setTitle}
                    setStart={setStart}
                    closeModal={closeModal}
                    pushEvent={pushEvent}
                />
            </Modal>

            <section className="flex flex-col container m-auto">
                <CalendarControls createBill={createNew} bills={props.bills} />
                <span
                    className="container m-auto min-h-500 bg-yellow-200 p-3 rounded-md"
                    onClick={handleCalendarClick}
                >
                    <Calendar
                        localizer={localizer}
                        events={props.bills}
                        startAccessor="start"
                        endAccessor="end"
                        eventPropGetter={eventStyleGetter}
                    />
                </span>
            </section>
        </div>
    );
}
export default BigCalendar;
