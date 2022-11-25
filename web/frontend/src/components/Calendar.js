import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Dropdown from 'react-dropdown';
import CreateBillPopUp from './CreateBillPopUp';
import { sendRequest } from '../common/Requests';
import PaperImage from '../img/paper_v3.jpg';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-dropdown/style.css';
import '../App.css';

const localizer = momentLocalizer(moment);

export function BigCalendar(props) {
    const [isEdit, setIsEdit] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [startDate, setStartDate] = React.useState(formatDate(new Date()));
    const [endDate, setEndDate] = React.useState(formatDate(new Date()));
    const [price, setPrice] = React.useState(0);
    const [currentBill, setCurrentBill] = React.useState(null);
    const [categoryId, setCategoryID] = React.useState(-1);

    function formatDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    function handleCalendarClick(e) {
        e.preventDefault();
        if (!e.target.classList.contains('rbc-event-content')) {
            return;
        }

        const month = new Date(
            document.querySelector('.rbc-toolbar-label').innerHTML
        );

        if (e.ctrlKey) {
            const bill = props.bills.find(
                (bill) => `${bill.name} - ${bill.price}` === e.target.innerHTML
            );

            const paidDate = new Date(
                month.getFullYear(),
                month.getMonth(),
                bill.startDate.getDate(),
                0
            );

            const editState = () => {
                const newState = props.bills.map((b) => {
                    if (b.id !== bill.id) {
                        return b;
                    }

                    let { isPaid } = b;

                    // Remove if exists
                    if (isPaid.some((d) => datesAreSame(d, paidDate))) {
                        isPaid = isPaid.filter(
                            (d) => !datesAreSame(d, paidDate)
                        );
                    } else {
                        // Add if not
                        isPaid.push(paidDate);
                    }

                    sendRequest(
                        'EditBill',
                        {
                            ...b,
                            isPaid,
                            userId: props.user.userId
                        },
                        (res) => {
                            console.log(res);
                        },
                        (err) => {
                            console.log(err);
                        }
                    );
                    return {
                        ...b,
                        isPaid
                    };
                });

                props.setBills(newState);
            };
            editState();
            return;
        }

        const bill = props.bills.find(
            (bill) => `${bill.name} - ${bill.price}` === e.target.innerHTML
        );
        createEdit(bill);
    }

    function deleteBill() {
        const id = currentBill.id;
        sendRequest(
            'RemoveBill',
            { id: id, userId: props.user.userId },
            (_res) => {
                const newState = props.bills.filter((b) => b.id !== id);
                props.setBills(newState);
                closeModal();
            },
            (err) => {
                console.log('Error deleting bill', err);
            }
        );
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setIsEdit(false);

        resetAllValues();
    }

    function resetAllValues() {
        setName('');
        setPrice(0);
        setStartDate(formatDate(new Date()));
        setEndDate(formatDate(new Date()));
        setCurrentBill(null);
        setCategoryID(-1);
    }

    function createEdit(bill) {
        setName(bill.name);
        setStartDate(formatDate(bill.startDate));
        setEndDate(formatDate(bill.endDate));
        setPrice(bill.price);
        setCurrentBill(bill);
        setCategoryID(bill.categoryId);

        setIsEdit(true);
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

    function datesAreSame(a, b) {
        const d1 = new Date(a);
        const d2 = new Date(b);

        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);

        return d1.valueOf() === d2.valueOf();
    }

    function eventStyleGetter(event, start, _end, _isSelected) {
        return {
            className: event.isPaid.some((d) => datesAreSame(d, start))
                ? 'paid'
                : 'unpaid'
        };
    }

    // Returns true if date is this month or later
    function billIsCurrent(bill) {
        const { startDate, endDate } = bill;
        const today = new Date();

        if (startDate > today) {
            return false;
        }

        if (endDate.getYear() < today.getYear()) {
            return false;
        }

        if (
            endDate.getYear() === today.getYear() &&
            endDate.getMonth() < today.getMonth()
        ) {
            return false;
        }

        return true;
    }

    return (
        <div className="flex min-h-9/10 mb-5">
            <section className="flex flex-col container m-auto">
                <div
                    className={`container m-auto mt-5 min-h-500 bg-[#BBE9E7] ${props.opacity} p-3 rounded-md`}
                >
                    <header className="grid grid-cols-3 font-bold mb-3 border-black border-b-2 p-1">
                        <h1 className="text-2xl">Bills</h1>

                        <Dropdown
                            className="smallDropdown-parent h-26 w-40 bg-white rounded-md mx-auto"
                            controlClassName="slim h-26"
                            placeholderClassName="slim h-26"
                            options={props.categories.map((c) => {
                                return {
                                    value: c.name,
                                    label: c.name
                                };
                            })}
                            value={
                                props.categories.find(
                                    (c) => c.id === props.categorySortID
                                )?.name
                            }
                            onChange={(e) => {
                                const category = props.categories.find(
                                    (c) => c.name === e.value
                                );
                                props.setCategorySortID(category.id);
                            }}
                        />

                        <span className="ml-auto text-md">
                            <h2 data-testid="billSum">
                                {'Total:  $' +
                                    (Object.entries(props.bills)
                                        .filter(([_key, bill]) =>
                                            billIsCurrent(bill)
                                        )
                                        .reduce(
                                            (acc, [_key, bill]) =>
                                                acc + +bill.price,
                                            0
                                        ) ?? 0) +
                                    ' / month'}
                            </h2>
                        </span>
                    </header>
                    <div onClick={handleCalendarClick}>
                        <Calendar
                            localizer={localizer}
                            events={getEventsFromBills(
                                props.bills,
                                props.categorySortID
                            )}
                            startAccessor="start"
                            endAccessor="end"
                            eventPropGetter={eventStyleGetter}
                            style={{
                                backgroundImage: props.backgroundToggle
                                    ? `url(${PaperImage})`
                                    : 'none'
                            }}
                        />
                    </div>
                    <footer className="border-black border-t-2 p-1 mt-3 flex flex-row justify-between gap-4">
                        <input
                            className="px-2 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md shadow-md"
                            type="button"
                            value="Add Bill"
                            onClick={createNew}
                        />

                        <p>Ctrl + Click to toggle paid</p>
                    </footer>
                    <CreateBillPopUp
                        {...{
                            isOpen,
                            user: props.user,
                            name,
                            startDate,
                            endDate,
                            price,
                            categoryId,
                            setCategoryID,
                            setPrice,
                            setName,
                            setStartDate,
                            setEndDate,
                            closeModal,
                            pushEvent,
                            deleteBill,
                            isEdit,
                            categories: props.categories,
                            id: currentBill?.id,
                            isPaid: currentBill?.isPaid
                        }}
                    />
                </div>
            </section>
        </div>
    );
}

export function getEventsFromBills(bills, categorySortID) {
    // Each bill will have multiple events for each pay date
    return bills
        .filter((bill) => {
            if (categorySortID === -1 || bill.categoryId === -1) {
                return true;
            }

            return bill.categoryId === categorySortID;
        })
        .map((bill) => {
            const payDates = [];

            const currentDate = new Date(bill.startDate);
            // Create an event for each pay date
            while (currentDate <= bill.endDate) {
                payDates.push({
                    ...bill,
                    start: new Date(currentDate),
                    end: new Date(currentDate),
                    title: `${bill.name} - ${bill.price}`,
                    allDay: true
                });

                currentDate.setMonth(currentDate.getMonth() + 1);
            }

            return payDates;
        })
        .flat();
}
