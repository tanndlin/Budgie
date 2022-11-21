import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BigCalendar } from '../components/Calendar';
import BudgetsView from '../components/BudgetsView';
import ExtraneousView from '../components/ExtraneousView';
import { sendRequest } from '../common/Requests';
import BackgroundImage from '../img/divider.jpg';

function CalendarPage(props) {
    const [categorySortID, setCategorySortID] = React.useState(-1);
    const { state } = useLocation();

    const hydrateCalendar = () => {
        if (!state.user) {
            window.location.href = '/';
            return;
        }

        const hydrate = (url, callback, notifId) => {
            sendRequest(
                url,
                { userId: state.user.userId },
                (res) => {
                    const parsed = JSON.parse(res.responseText);

                    const ret = Object.values(parsed)[0].map((item) => {
                        const obj = {};
                        Object.keys(item).forEach((key) => {
                            // If the value is a date, convert it to a Date object
                            if (key.toLowerCase().includes('date')) {
                                obj[key] = new Date(item[key]);
                            } else {
                                obj[key] = item[key];
                            }
                        });
                        return obj;
                    });

                    callback(ret);
                    props.removeNotification(notifId);
                },
                (err) => {
                    console.log(url, err);
                }
            );
        };

        hydrate(
            'GetBills',
            props.setBills,
            props.pushNotification('Retrieving Bills', 'Please wait...')
        );

        hydrate(
            'GetBudgets',
            props.setBudgets,
            props.pushNotification('Retrieving Budgets', 'Please wait...')
        );

        hydrate(
            'GetOneOffs',
            props.setExtras,
            props.pushNotification('Retrieving One Offs', 'Please wait...')
        );

        hydrate(
            'GetCategories',
            (cats) => {
                props.setCategories([...cats, { id: -1, name: 'All' }]);
            },
            props.pushNotification('Retrieving Categories', 'Please wait...')
        );
    };

    React.useEffect(() => {
        if (props.user) {
            return;
        }

        props.setUser(state.user);
        hydrateCalendar();
    }, []);

    const backgroundImage = 'fixed h-full w-full opacity-70 object-fill';
    const [backgroundToggle, setBackgroundToggle] = useState(() => {
        const saved = localStorage.getItem('backgroundToggle');
        const initialValue = JSON.parse(saved);
        return initialValue || null;
    });
    const ChangeBackgroundToggle = () => {
        if (backgroundToggle == null) {
            setBackgroundToggle(true);
        } else if (backgroundToggle == false) {
            setBackgroundToggle(true);
        } else {
            // backgroundToggle == true
            setBackgroundToggle(false);
        }
        return backgroundToggle;
    };
    useEffect(() => {
        localStorage.setItem(
            'backgroundToggle',
            JSON.stringify(backgroundToggle)
        );
    }, [backgroundToggle]);

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
        <main className="min-h-minus-header pb-40">
            {!backgroundToggle && (
                <img
                    className={backgroundImage}
                    src={BackgroundImage}
                    alt="Wooden Texture"
                />
            )}
            <div className="fixed h-full w-full object-fill overflow-y-auto snap-x scroll-smooth">
                <div className="snap-end">
                    <BigCalendar
                        user={props.user}
                        bills={props.bills}
                        setBills={props.setBills}
                        modifyEvents={modifyEvents}
                        categories={props.categories}
                        categorySortID={categorySortID}
                        setCategorySortID={setCategorySortID}
                    />
                </div>
                <div className="snap-end">
                    <BudgetsView
                        user={props.user}
                        budgets={props.budgets}
                        setBudgets={props.setBudgets}
                        categories={props.categories}
                        categorySortID={categorySortID}
                    />
                </div>
                <div className="snap-end">
                    <ExtraneousView
                        user={props.user}
                        extras={props.extras}
                        setExtras={props.setExtras}
                        categories={props.categories}
                        categorySortID={categorySortID}
                    />
                </div>
            </div>
        </main>
    );
}

export default CalendarPage;
