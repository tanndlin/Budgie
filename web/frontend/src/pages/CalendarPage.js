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
        if (!state.user) {
            window.location.href = '/';
            return;
        }

        // const hydrate = (url, callback) => {
        //     sendRequest(
        //         url,
        //         { userId: state.user.userId },
        //         (res) => {
        //             const parsed = JSON.parse(res.responseText);
        //             callback(parsed);
        //         },
        //         (err) => {
        //             console.log(url, err);
        //         }
        //     );
        // };

        // hydrate('GetBills', props.setBills);
        // hydrate('GetBudgets', props.setBudgets);
        // hydrate('GetOneOffs', props.setOneOffs);
        // hydrate('GetCategories', props.setCategories);

        sendRequest(
            'GetBills',
            { userId: state.user.userId },
            (res) => {
                const { bills } = JSON.parse(res.responseText);
                props.setBills(
                    bills.map((b) => ({
                        ...b,
                        startDate: new Date(b.startDate),
                        endDate: new Date(b.endDate)
                    }))
                );
            },
            (err) => {
                console.log('GetBills', err);
            }
        );

        sendRequest(
            'GetBudgets',
            { userId: state.user.userId },
            (res) => {
                const { budgets } = JSON.parse(res.responseText);
                props.setBudgets(
                    budgets.map((b) => ({
                        ...b,
                        startDate: new Date(b.startDate)
                    }))
                );
            },
            (err) => {
                console.log('GetBudgets', err);
            }
        );

        sendRequest(
            'GetOneOffs',
            { userId: state.user.userId },
            (res) => {
                const { oneOffs } = JSON.parse(res.responseText);
                props.setExtras(
                    oneOffs.map((o) => ({
                        ...o,
                        date: new Date(o.date)
                    }))
                );
            },
            (err) => {
                console.log('GetOneOffs', err);
            }
        );
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
                    user={props.user}
                    budgets={props.budgets}
                    setBudgets={props.setBudgets}
                    categories={props.categories}
                    categorySortID={categorySortID}
                />

                <ExtraneousView
                    user={props.user}
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
