import React from 'react';
import { BigCalendar } from '../components/Calendar';
import BudgetsView from '../components/BudgetsView';
import ExtraneousView from '../components/ExtraneousView';
import { useLocation } from 'react-router-dom';
import { sendRequest } from '../common/Requests';

function CalendarPage(props) {
    const [categorySortID, setCategorySortID] = React.useState(-1);
    const { state } = useLocation();

    const hydrateCalendar = () => {
        const hydrate = (url, callback) => {
            sendRequest(
                url,
                { userId: state.user.userId },
                (res) => {
                    const { userId: _userId, bills } = JSON.parse(
                        res.responseText
                    );

                    const parsed = bills.map((bill) => ({
                        ...bill,
                        startDate: new Date(bill.startDate),
                        endDate: new Date(bill.endDate)
                    }));

                    console.log(parsed);

                    callback(parsed);
                },
                (err) => {
                    console.log(url, err);
                }
            );
        };

        if (!state.user) {
            window.location.href = '/';
            return;
        }

        hydrate('GetBills', props.setBills);
        hydrate('GetBudgets', props.setBudgets);
        hydrate('GetOneOffs', props.setOneOffs);
        hydrate('GetCategories', props.setCategories);
    };

    React.useEffect(() => {
        props.setUser(state.user);
        hydrateCalendar();
    }, []);

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
                    user={props.user}
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
