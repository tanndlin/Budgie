import React from 'react';
import { useLocation } from 'react-router-dom';
import { BigCalendar } from '../components/Calendar';
import BudgetsView from '../components/BudgetsView';
import ExtraneousView from '../components/ExtraneousView';
import { sendRequest } from '../common/Requests';
import BackgroundImage from '../img/divider_v2.jpg';

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

    // Does both operations because 2 setstates overwrite each other
    function modifyEvents(add, remove) {
        if (remove) {
            add.id = remove.id;
            props.setBills([...props.bills.filter((e) => e !== remove), add]);
        } else {
            props.setBills([...props.bills, add]);
        }
    }

    const opacity = () => {
        if (props.backgroundToggle) {
            return 'bg-opacity-90';
        }
        return 'bg-opacity-50';
    };

    return (
        <main className="min-h-minus-header pb-40">
            {props.backgroundToggle && (
                <img
                    className={'fixed h-full w-full opacity-70 object-fill'}
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
                        opacity={opacity()}
                        backgroundToggle={props.backgroundToggle}
                        pushNotification={props.pushNotification}
                        removeNotification={props.removeNotification}
                    />
                </div>
                <div className="snap-end">
                    <BudgetsView
                        user={props.user}
                        budgets={props.budgets}
                        setBudgets={props.setBudgets}
                        categories={props.categories}
                        categorySortID={categorySortID}
                        opacity={opacity()}
                        pushNotification={props.pushNotification}
                    />
                </div>
                <div className="snap-end">
                    <ExtraneousView
                        user={props.user}
                        extras={props.extras}
                        setExtras={props.setExtras}
                        categories={props.categories}
                        categorySortID={categorySortID}
                        opacity={opacity()}
                    />
                </div>
            </div>
        </main>
    );
}

export default CalendarPage;
