import React from 'react';
import Header from '../components/Header';
import ListView from '../components/ListView';

function ListPage(props) {
    return (
        <div className="h-screen">
            <Header />
            <main className='bg-orange-200 min-h-minus-header'>
                <ListView
                    bills={props.bills}
                    setBills={props.setBills}
                    budgets={props.budgets}
                    setBudgets={props.setBudgets}
                />
            </main>
        </div>
    );
}

export default ListPage;