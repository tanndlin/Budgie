import React from 'react';
import { BigCalendar } from '../components/Calendar';
import BudgetsView from '../components/BudgetsView';
import ExtraneousView from '../components/ExtraneousView';
import { useLocation } from 'react-router-dom';
import { sendRequest } from '../common/Requests';

function CalendarPage(props) {
    const [categorySortID, setCategorySortID] = React.useState(-1);
    const { state } = useLocation();
    props.setUser(state.user);

    if (props.user === null) {
        window.location.href = '/';
    } else {
        // TODO: Hydrate bills and budgets
        // TODO: Hydrate bills
        sendRequest(
            'GetBills',
            { userId: props.user.userId },
            (res) => {
                const bills = JSON.parse(res.responseText);
                console.log(bills);
                // props.setBills(bills);
            },
            (err) => {
                console.log(err);
            }
        );

        sendRequest(
            'GetBudgets',
            { userId: props.user.userId },
            (res) => {
                const budgets = JSON.parse(res.responseText);
                console.log(budgets);
                // props.setBudgets(budgets);
            },
            (err) => {
                console.log(err);
            }
        );

        sendRequest(
            'GetOneOffs',
            { userId: props.user.userId },
            (res) => {
                const oneOffs = JSON.parse(res.responseText);
                console.log(oneOffs);
                // props.setOneOffs(oneOffs);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    // Does both operations because 2 setstates overwrite each other
    function modifyEvents(add, remove) {
        if (remove) {
            add.id = remove.id;
            props.setBills([...props.bills.filter((e) => e !== remove), add]);
        } else {
            props.setBills([...props.bills, add]);
        }
    }

    return (
        <div className="h-screen">
            <main className="min-h-minus-header">
                <BigCalendar
                    bills={props.bills}
                    setBills={props.setBills}
                    modifyEvents={modifyEvents}
                    categories={props.categories}
                    categorySortID={categorySortID}
                    setCategorySortID={setCategorySortID}
                />

                <BudgetsView
                    budgets={props.budgets}
                    setBudgets={props.setBudgets}
                    categories={props.categories}
                    categorySortID={categorySortID}
                />

                <ExtraneousView
                    extras={props.extras}
                    setExtras={props.setExtras}
                    categories={props.categories}
                    categorySortID={categorySortID}
                />
            </main>
        </div>
    );
}

export default CalendarPage;
