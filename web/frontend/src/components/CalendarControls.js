import React from 'react';

function CalendarControls(props) {
    return (
        <div className='flex mb-5'>
            <span className='grid grid-cols-2 bg-yellow-200 gap-5 p-5 rounded-md'>
                <button className='bg-red-500 h-7 px-2 rounded-md' onClick={props.createBill}>Create New Bill</button>
                <button className='bg-red-500 h-7 px-2 rounded-md' onClick={console.log(props.events)}>IDK yet</button>
            </span>
        </div>
    );
}


export default CalendarControls;