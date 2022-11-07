import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Modal from 'react-modal';
import CreateEvent from './CreateEvent';
import CalendarControls from './CalendarControls';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../App.css';
import ModalStyles from '../common/ModalStyles';

const localizer = momentLocalizer(moment);

function BigCalendar(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [start, setStart] = React.useState(formatDate(new Date()));
    const [amount, setAmount] = React.useState(0);
    const [currentBill, setCurrentBill] = React.useState(null);

    function formatDate(date) {
        // return date.toISOString().split('T')[0];
        // return date;
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    function handleCalendarClick(e) {
        e.preventDefault();
        if (!e.target.classList.contains('rbc-event-content'))
            return;

        if (e.ctrlKey) {
            const bill = props.bills.find(bill => bill.title === e.target.innerHTML);
            bill.resources.paid = !bill.resources.paid;

            const editState = () => {
                const newState = props.bills.map(b => {
                    if (b.title === bill.title)
                        return {
                            ...b, resources: {
                                paid: !b.resources.paid
                            }
                        };

                    return b;

                });

                props.setBills(newState);
            };
            editState();
            return;
        }

        const bill = props.bills.find((bill) => bill.title === e.target.innerHTML);
        createEdit(bill);
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);

        resetAllValues();
    }

    function resetAllValues() {
        setIsEdit(false);
        setTitle('');
        setAmount(0);
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
        resetAllValues();

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
                style={ModalStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <CreateEvent
                    events={props.bills}
                    edit={isEdit}
                    title={title}
                    start={start}
                    amount={amount}
                    setAmount={setAmount}
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
