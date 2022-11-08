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
                <div
                    className="container m-auto mt-5 min-h-500 bg-[#BBE9E7] bg-opacity-50 p-3 rounded-md"
                    onClick={handleCalendarClick}
                >
                    <header className="flex flex-row justify-between font-bold mb-3 border-black border-b-2 p-1">
                        <h1 className="text-2xl">Bills</h1>
                        <span className='text-md'>
                            <h2 className=''>{
                                `Total:  $${Object.entries(props.bills)
                                    .reduce((acc, [key, bill]) =>
                                        acc + +bill.amount, 0)}
                            / month`
                            }</h2>
                        </span>
                    </header>
                    <Calendar
                        localizer={localizer}
                        events={props.bills}
                        startAccessor="start"
                        endAccessor="end"
                        eventPropGetter={eventStyleGetter}
                    />
                    <footer className='border-black border-t-2 p-1 mt-3 flex flex-row gap-4'>
                        <input className='px-2 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md' type='button' value='Add Bill'
                            onClick={createNew} />
                    </footer>
                </div>
            </section>
        </div>
    );
}
export default BigCalendar;
