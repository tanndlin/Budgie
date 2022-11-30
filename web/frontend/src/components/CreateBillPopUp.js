import React from 'react';
import Dropdown from 'react-dropdown';
import { sendRequest } from '../common/Requests';
import { adjustDateForTimezone, formatDate } from './Calendar';

function CreateBillPopUp(props) {
    function editEvent(e) {
        e.preventDefault();

        if (!validate({ startDate: props.startDate, endDate: props.endDate })) {
            return;
        }

        const bill = {
            name: props.name,
            categoryId: props.categoryId,
            color: '#ffffff',
            price: props.price,
            startDate: adjustDateForTimezone(new Date(props.startDate)),
            endDate: adjustDateForTimezone(new Date(props.endDate)),
            recurrence: 'monthly',
            isPaid: props.isPaid ?? []
        };

        const isNew = !props.id;
        if (isNew) {
            sendRequest(
                'CreateBill',
                { ...bill, userId: props.user.userId },
                (res) => {
                    const resBill = JSON.parse(res.responseText);
                    bill.id = resBill.id;
                    props.pushEvent(bill);
                },
                (err) => {
                    console.log('Error creating bill', err);
                }
            );
        } else {
            sendRequest(
                'EditBill',
                { ...bill, id: props.id, userId: props.user.userId },
                (res) => {
                    const resBill = JSON.parse(res.responseText);
                    bill.id = resBill.id;
                    props.pushEvent(bill);
                },
                (err) => {
                    console.log('Error editting bill', err);
                }
            );
        }

        props.closeModal();
    }

    function validate(bill) {
        if (
            bill.startDate !== 'Invalid date' &&
            bill.endDate !== 'Invalid date'
        ) {
            return true;
        }

        const id = props.pushNotification(
            'Invalid Date(s)',
            'Please Enter a valid start and end date'
        );

        setTimeout(() => {
            props.removeNotification(id);
        }, 5000);
        return false;
    }

    function nameChange(e) {
        props.setName(e.target.value);
    }

    // Time zones are fucking cringe, the whole world needs to be on UTC
    function startDateChange(e) {
        const date = new Date(e.target.value);
        const timeZoneAdjusted = adjustDateForTimezone(date);
        props.setStartDate(formatDate(timeZoneAdjusted));
    }

    function endDateChange(e) {
        const date = new Date(e.target.value);
        const timeZoneOffset = new Date().getTimezoneOffset();
        const timeZoneAdjusted = new Date(
            date.getTime() + timeZoneOffset * 60 * 1000
        );
        props.setEndDate(formatDate(timeZoneAdjusted));
    }

    function priceChange(e) {
        props.setPrice(e.target.value);
    }

    const pendDelete = () => {
        props.pushNotification(
            'Are You Sure?',
            `Deleting ${props.name} cannot be undone`,
            true,
            () => {
                props.deleteBill(props.id);
            }
        );
    };

    return (
        <section
            className={
                'flex container h-full relative sidebar' +
                (props.isOpen ? '' : ' sidebarClose')
            }
        >
            <input
                className="absolute top-0 right-0 cursor-pointer text-[36px] font-bold mr-4"
                type="button"
                value="&times;"
                onClick={() => {
                    props.closeModal();
                }}
            />

            <div
                className={
                    'p-4 my-4 h-3/4 m-auto bg-[#b2c6ec] bg-opacity-[.7] rounded-md duration-500' +
                    (props.isOpen ? '' : ' sidebarChildClose')
                }
            >
                <h1 className="text-center text-[#3B3548] text-6xl mb-4">
                    Bill
                </h1>

                <form
                    onSubmit={editEvent}
                    className="grid grid-cols-3 gap-4 place-items-center"
                >
                    <span className="flex flex-col">
                        <label htmlFor="Name">Name</label>
                        <input
                            className="w-48 px-1 placeholder-[#4D4D4D] rounded-md"
                            type="text"
                            id="nameInput"
                            placeholder="Name"
                            onChange={nameChange}
                            value={props.name}
                        />
                    </span>

                    <span className="flex flex-col">
                        <label htmlFor="Start Date">Start Date</label>
                        <input
                            className="w-48 px-1 placeholder-[#4D4D4D] rounded-md"
                            type="date"
                            id="startDateDateInput"
                            onChange={startDateChange}
                            value={props.startDate}
                        />
                    </span>

                    <span className="flex flex-col">
                        <label htmlFor="Price">Price</label>
                        <input
                            className="w-48 px-1 placeholder-[#4D4D4D] rounded-md"
                            type="number"
                            id="priceInput"
                            onChange={priceChange}
                            value={props.price}
                        />
                    </span>

                    <p></p>

                    <span className="flex flex-col">
                        <label htmlFor="End Date">End Date</label>
                        <input
                            className="w-48 px-1 placeholder-[#4D4D4D] rounded-md"
                            type="date"
                            id="endDateInput"
                            onChange={endDateChange}
                            value={props.endDate}
                        />
                    </span>

                    <span className="flex flex-col">
                        <label htmlFor="Category">Category</label>
                        <span className="h-[26px]">
                            <Dropdown
                                className="smallDropdown-parent h-26 bg-white rounded-md w-48"
                                controlClassName="slim h-26"
                                placeholderClassName="slim h-26"
                                options={props.categories.map((c) => {
                                    return {
                                        value: c.name,
                                        label: c.name
                                    };
                                })}
                                onChange={(e) => {
                                    props.setCategoryID(
                                        props.categories.find(
                                            (c) => c.name === e.value
                                        ).id
                                    );
                                }}
                                value={
                                    props.categories.find(
                                        (c) => c.id === props.categoryId
                                    ).name
                                }
                            />
                        </span>
                    </span>

                    <p></p>
                    <input
                        type="submit"
                        id="editButton"
                        className="w-40 h-10 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md"
                        value={props.isEdit ? 'Edit Bill' : 'Create Bill'}
                        onClick={editEvent}
                    />
                    {props.isEdit && (
                        <input
                            type="button"
                            id="deleteButton"
                            className="w-40 h-10 bg-[#f13232] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md"
                            value="Delete Bill"
                            onClick={pendDelete}
                        />
                    )}
                    {!props.isEdit && <p></p>}
                </form>
            </div>
        </section>
    );
}

export default CreateBillPopUp;
