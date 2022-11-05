import React from 'react';

function CalendarControls(props) {
    return (
        <div className='flex my-5'>
            <span className='grid grid-cols-2 bg-[#BBE9E7] bg-opacity-50 gap-5 p-5 rounded-md'>
                <button className='bg-red-500 h-7 px-2 rounded-md' onClick={props.createBill}>Create New Bill</button>
                <button className='bg-red-500 h-7 px-2 rounded-md'>IDK yet</button>
            </span>
        </div>
    );
}


export default CalendarControls;