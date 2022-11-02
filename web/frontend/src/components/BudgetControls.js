import React from 'react';

function BudgetControls(props) {
    function createBudget() {
        props.newBudget({
            name: 'New Budget',
            total: 100,
            spent: 0,
        });
    }

    return (
        <div className='flex my-5'>
            <span className='grid grid-cols-2 bg-yellow-200 gap-5 p-5 rounded-md'>
                <button className='bg-red-500 h-7 px-2 rounded-md' onClick={createBudget}>Create New Budget</button>
                <button className='bg-red-500 h-7 px-2 rounded-md'>IDK yet</button>
            </span>
        </div>
    );
}


export default BudgetControls;