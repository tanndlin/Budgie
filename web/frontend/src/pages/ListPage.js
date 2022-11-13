import React from 'react';
import BudgetsView from '../components/BudgetsView';
import ListView from '../components/ListView';
import BackgroundImage from '../img/paper_v2.jpg';

function ListPage(props) {
    function modifyEvents(add, remove) {
        if (remove) {
            props.setBills([...props.bills.filter((e) => e !== remove), add]);
        } else {
            props.setBills([...props.bills, add]);
        }
    }

    return (
        <div className=''>
            <img className='fixed h-full w-full opacity-70 object-fill' src={BackgroundImage} alt='Background image' />
            <div className="fixed h-full w-full object-fill overflow-y-auto snap-x scroll-smooth">
                <div className='min-h-full'>
                    <div className='snap-end'>
                        <ListView
                            bills={props.bills}
                            setBills={props.setBills}
                            budgets={props.budgets}
                            setBudgets={props.setBudgets}
                            modifyEvents={modifyEvents}
                        />
                    </div>
                    <div className='snap-end'>
                        <BudgetsView
                            budgets={props.budgets}
                            setBudgets={props.setBudgets}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListPage;