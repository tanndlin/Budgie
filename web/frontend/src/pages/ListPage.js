import React from 'react';
import Header from '../components/Header';
import ListView from '../components/ListView';

function ListPage(props) {
    return (
        <div className="h-screen">
            <Header
                user={props.user}
                setUser={props.setUser}
                bills={props.bills}
                setBills={props.setBills}
                budgets={props.budgets}
                setBudgets={props.setBudgets}
            />
            <main className='bg-orange-200 min-h-minus-header h-1'>
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