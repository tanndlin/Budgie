import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import SideBar from './SideBar';
import Dropdown from 'react-dropdown';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-dropdown/style.css';
import '../App.css';

const localizer = momentLocalizer(moment);

export function BigCalendar(props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [start, setStart] = React.useState(formatDate(new Date()));
    const [end, setEnd] = React.useState(formatDate(new Date()));
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

        const month = new Date(document.querySelector('.rbc-toolbar-label').innerHTML);

        if (e.ctrlKey) {
            const bill = props.bills.find(bill => bill.title === e.target.innerHTML);
            bill.paid = !bill.paid;

            const day = bill.start.getDate();
            const paidDate = new Date(month.getFullYear(), month.getMonth(), day, 1);

            const editState = () => {
                const newState = props.bills.map(b => {
                    if (b.id === bill.id)
                        return {
                            ...b,
                            lastPaid: paidDate,
                        };

                    return b;

                });

                props.setBills(newState);
            };
            editState();
            return;
        }

        const bill = props.bills.find((bill) => `${bill.title} - ${bill.amount}` === e.target.innerHTML);
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
        setTitle('');
        setAmount(0);
        setStart(formatDate(new Date()));
        setEnd(formatDate(new Date()));
        setCurrentBill(null);
    }

    function createEdit(bill) {
        setTitle(bill.title);
        setStart(formatDate(bill.start));
        setEnd(formatDate(bill.end));
        setAmount(bill.amount);
        setCurrentBill(bill);

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
            className: event.lastPaid >= start ? 'paid' : 'unpaid',
        };
    }

    // Returns true if date is this month or later
    function billIsCurrent(bill) {
        const { start, end } = bill;
        const today = new Date();

        if (start > today)
            return false;

        if (end.getYear() < today.getYear())
            return false;

        return end.getMonth() >= today.getMonth();
    }

    function onSelect(e) {
        console.log(e);
    }

    console.log(props.categories);

    return (
        <div className="flex min-h-9/10 mb-5">
            <section className="flex flex-col container m-auto">
                <SideBar
                    isOpen={isOpen}
                    title={title}
                    start={start}
                    end={end}
                    amount={amount}
                    setAmount={setAmount}
                    setTitle={setTitle}
                    setStart={setStart}
                    setEnd={setEnd}
                    closeModal={closeModal}
                    pushEvent={pushEvent}
                />

                <div
                    className="container m-auto mt-5 min-h-500 bg-[#BBE9E7] bg-opacity-50 p-3 rounded-md"
                    onClick={handleCalendarClick}
                >
                    <header className="flex flex-row justify-between font-bold mb-3 border-black border-b-2 p-1">
                        <h1 className="text-2xl">Bills</h1>

                        <Dropdown
                            options={props.categories.map(c => {
                                return {
                                    value: c.name,
                                    label: c.name,
                                }
                            })}
                            onChange={onSelect}
                            className='dropdown'
                            controlClassName='dropdown-control'
                            menuClassName='dropdown-menu'
                            arrowClassName='dropdown-arrow'
                            placeholderClassName='dropdown-placeholder'
                        />

                        <span className='text-md'>
                            <h2 data-testid='billSum'>{
                                `Total:  $${Object.entries(props.bills)
                                    .filter(([key, bill]) => billIsCurrent(bill))
                                    .reduce((acc, [key, bill]) =>
                                        acc + +bill.amount, 0) ?? 0} / month`
                            }</h2>
                        </span>
                    </header>
                    <Calendar
                        localizer={localizer}
                        events={getEventsFromBills(props.bills)}
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

export function getEventsFromBills(bills) {
    // Each bill will have multiple events for each pay date
    return bills.map(bill => {
        const payDates = [];

        const currentDate = new Date(bill.start);
        // Create an event for each pay date
        while (currentDate <= bill.end) {
            payDates.push({
                ...bill,
                start: new Date(currentDate),
                end: new Date(currentDate),
                title: `${bill.title} - ${bill.amount}`,
                allDay: true,
            });

            currentDate.setMonth(currentDate.getMonth() + (bill.frequency ?? 1));
        }

        return payDates;
    }).flat();
}