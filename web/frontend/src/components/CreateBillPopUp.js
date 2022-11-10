import React from "react";

function CreateBillPopUp(props) {
    function editEvent(e) {
        e.preventDefault();


        const isPaid = Math.random() < 0.5;
        props.pushEvent({
            title: props.title,
            start: props.start,
            end: props.end,
            id: Math.random(),
            amount: props.amount,
            frequency: 1,
            lastPaid: isPaid ? new Date() : null,
        });

        props.closeModal();
    }

    function titleChange(e) {
        props.setTitle(e.target.value);
    }

    // Time zones are fucking cringe, the whole world needs to be on UTC
    function startChange(e) {
        const date = new Date(e.target.value);
        const timeZoneOffset = new Date().getTimezoneOffset();
        const timeZoneAdjusted = new Date(date.getTime() + timeZoneOffset * 60 * 1000);
        props.setStart(timeZoneAdjusted);
    }

    function endChange(e) {
        const date = new Date(e.target.value);
        const timeZoneOffset = new Date().getTimezoneOffset();
        const timeZoneAdjusted = new Date(date.getTime() + timeZoneOffset * 60 * 1000);
        props.setEnd(timeZoneAdjusted);
    }

    function amountChange(e) {
        props.setAmount(e.target.value);
    }


    return (
        <section className='flex container h-full bg-[#BBE9E7] bg-opacity-50 rounded-md relative'>
            <input className='absolute top-0 right-0 cursor-pointer text-[36px] font-bold mr-4' type='button' value='&times;' onClick={() => { props.closeModal() }} />

            <div className='p-4 my-4 h-3/4 m-auto bg-[#b2c6ec] bg-opacity-[.7] rounded-md'>
                <h1 className='text-center text-[#3B3548] text-6xl mb-4'>Bill</h1>

                <form onSubmit={editEvent} className='grid grid-cols-3 gap-4 place-items-center'>
                    <div className='grid grid-rows-2'>
                        <span className='flex flex-col'>
                            <label htmlFor="Title">Title</label>
                            <input className='w-48 px-1 placeholder-[#4D4D4D] rounded-md' type='text' id='titleInput' placeholder='Title' onChange={titleChange} value={props.title} />
                        </span>
                    </div>

                    <div className='grid grid-rows-2'>
                        <span className='flex flex-col'>
                            <label htmlFor="Start Date">Start Date</label>
                            <input className='w-48 px-1 placeholder-[#4D4D4D] rounded-md' type='date' id='startDateInput' onChange={startChange} value={props.start.toISOString().split('T')[0]} />
                        </span>

                        <span className='flex flex-col'>
                            <label htmlFor="End Date">End Date</label>
                            <input className='w-48 px-1 placeholder-[#4D4D4D] rounded-md' type='date' id='endDateInput' onChange={endChange} value={props.end.toISOString().split('T')[0]} />
                        </span>
                    </div>

                    <div className='grid grid-rows-2'>
                        <span className='flex flex-col'>
                            <label htmlFor="Amount">Amount</label>
                            <input className='w-48 px-1 placeholder-[#4D4D4D] rounded-md' type='number' id='amountInput' onChange={amountChange} value={props.amount} />
                        </span>
                    </div>

                    <p></p>
                    <input type='submit' id='editButton' className='w-40 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md' value='Create Bill'
                        onClick={editEvent} />
                    <p></p>
                </form>
            </div>
        </section>
    );
}

export default CreateBillPopUp;