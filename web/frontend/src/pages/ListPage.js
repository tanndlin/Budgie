import React from 'react';
import ListView from '../components/ListView';

function ListPage(props) {
    function modifyEvents(add, remove) {
        if (remove) {
            props.setBills([...props.bills.filter((e) => e !== remove), add]);
        } else {
            props.setBills([...props.bills, add]);
        }
    }

    return (
        <div className="h-minus-header min-h-minus-header">
            <main className='bg-orange-200 min-h-full'>
                <ListView
                    bills={props.bills}
                    setBills={props.setBills}
                    budgets={props.budgets}
                    setBudgets={props.setBudgets}
                    modifyEvents={modifyEvents}
                />
            </main>
        </div>
    );
}

export default ListPage;