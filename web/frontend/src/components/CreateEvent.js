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
            amount: 500,
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


    return (
        <div className="flex flex-col justify-center items-center bg-orange-200 w-full h-full">
            <form onSubmit={editEvent} className='bg-yellow-200 p-10 flex flex-col items-center'>
                <span id='inner-title' className='text-3xl font-bold'>Event</span><br />
                <input className='mt-5 px-2' type='text' id='titleInput' placeholder='Title' onChange={titleChange} value={props.title} /><br />
                <label htmlFor="Due Date" className=''>Due Date</label>
                <input className='mb-5 px-2' type='date' id='dueDateInput' onChange={startChange} value={props.start.toISOString().split('T')[0]} /><br />
                <input type='submit' id='editButton' className='w-40 bg-red-500' value='Create Event'
                    onClick={editEvent} />
            </form>
        </div>
    );
}

export default CreateEvent;