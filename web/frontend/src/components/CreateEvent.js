import React from "react";

function CreateEvent(props) {
    function editEvent(e) {
        e.preventDefault();

        props.pushEvent({
            title: props.title,
            start: props.start,
            end: props.start,
            resources: {
                paid: Math.random() < 0.5,
            },
            amount: props.amount,
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

    function amountChange(e) {
        props.setAmount(e.target.value);
    }


    return (
        <section className='flex container h-full bg-[#BBE9E7] bg-opacity-50 rounded-md'>
            <div className='w-3/4 py-4 h-3/4 m-auto bg-[#b2c6ec] bg-opacity-[.7] rounded-md max-w-[500px]'>
                <h1 className='text-center text-[#3B3548] text-6xl mb-16'>Event</h1>

                <form onSubmit={editEvent} className='grid grid-rows-auto h-1/2 place-items-center'>
                    <input className='w-48 px-1 placeholder-[#4D4D4D] rounded-md' type='text' id='titleInput' placeholder='Title' onChange={titleChange} value={props.title} /><br />
                    <span className='flex flex-col'>
                        <label htmlFor="Due Date" className=''>Due Date</label>
                        <input className='w-48 px-1 placeholder-[#4D4D4D] rounded-md' type='date' id='dueDateInput' onChange={startChange} value={props.start.toISOString().split('T')[0]} /><br />
                    </span>
                    <span className='flex flex-col'>
                        <label htmlFor="Amount" className=''>Amount</label>
                        <input className='w-48 px-2 placeholder-[#4D4D4D] rounded-md' type='number' id='amountInput' onChange={amountChange} value={props.amount} /><br />
                    </span>
                    <input type='submit' id='editButton' className='w-40 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md' value='Create Event'
                        onClick={editEvent} />
                </form>
            </div>
        </section>
    );
}

export default CreateEvent;