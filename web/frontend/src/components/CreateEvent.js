import React from "react";
import moment from 'moment';

function CreateEvent(props) {
    function editEvent(e) {
        e.preventDefault();
        const title = document.getElementById('titleInput').value;
        const start = document.getElementById('dueDateInput').value;

        const event = { title, start, end: moment(start).add(1, 'days') };
        props.events.push(event);
        props.closeModal();
    }

    return (
        <div className="flex flex-col justify-center items-center bg-orange-200 w-full h-full">
            <form onSubmit={editEvent} className='bg-yellow-200 p-10 flex flex-col items-center'>
                <span id='inner-title' className='text-3xl font-bold'>Event</span><br />
                <input className='mt-5 px-2' type='text' id='titleInput' placeholder='Title' /><br />
                <label htmlFor="Due Date" className=''>Due Date</label>
                <input className='mb-5 px-2' type='date' id='dueDateInput' /><br />
                <input type='submit' id='editButton' className='w-40 bg-red-500' value='Create Event'
                    onClick={editEvent} />
            </form>
        </div>
    );
}

export default CreateEvent;