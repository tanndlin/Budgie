import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CalendarPage from './pages/CalendarPage';
import Header from './components/Header';
import NotificationProvider from './components/NotificationProvider';

import './App.css';
import './index.css';
import AccountPage from './pages/AccountPage';

function App() {
    const [user, setUser] = React.useState(null);
    const [bills, setBills] = React.useState([]);
    const [budgets, setBudgets] = React.useState([]);
    const [extras, setExtras] = React.useState([]);
    const [categories, setCategories] = React.useState([
        {
            id: -1,
            name: 'All'
        },
        {
            id: 1,
            name: 'Food'
        },
        {
            id: 2,
            name: 'Utilities'
        }
    ]);

    const [notifications, setNotifications] = React.useState([]);

    let notifId = 0;
    const pushNotification = (title, message) => {
        const notification = {
            id: notifId++,
            title: title,
            message: message
        };

        setNotifications((notifications) => [...notifications, notification]);
        return notification.id;
    };

    const removeNotification = (id) => {
        setNotifications((notifications) =>
            notifications.map((n) => {
                if (n.id === id) {
                    n.close = true;
                }

                return n;
            })
        );

        setTimeout(() => {
            setNotifications((notifications) =>
                notifications.filter((notification) => notification.id !== id)
            );
        }, 1000);
    };

    const [backgroundToggle, setBackgroundToggle] = React.useState(() => {
        const saved = localStorage.getItem('backgroundToggle');
        const initialValue = JSON.parse(saved);
        return initialValue ?? false;
    });

    React.useEffect(() => {
        localStorage.setItem(
            'backgroundToggle',
            JSON.stringify(backgroundToggle)
        );
    }, [backgroundToggle]);

    const props = {
        user,
        setUser,
        bills,
        setBills,
        budgets,
        setBudgets,
        extras,
        setExtras,
        categories,
        setCategories,
        notifications,
        pushNotification,
        removeNotification,
        backgroundToggle,
        setBackgroundToggle
    };

    const headerProps = (showNav) => ({
        ...props,
        showNav
    });

    return (
        <BrowserRouter>
            <NotificationProvider {...{ notifications }} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="h-screen">
                            <Header {...headerProps(false)} />
                            <LoginPage {...props} />
                        </div>
                    }
                />

                <Route
                    path="/calendar"
                    element={
                        <div className="h-screen">
                            <Header {...headerProps(true)} />
                            <CalendarPage {...props} />
                        </div>
                    }
                />

                <Route
                    path="/account"
                    element={
                        <div className="h-screen">
                            <Header {...headerProps(true)} />
                            <AccountPage {...props} />
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
