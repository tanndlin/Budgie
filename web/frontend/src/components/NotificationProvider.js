import React from 'react';
import Notification from './Notification';

function NotificationProvider(props) {
    return (
        <nav className="absolute top-[5rem] left-[1rem] grid grid-flow-row gap-4">
            {props.notifications &&
                props.notifications.map((notif) => (
                    <Notification
                        key={notif.id}
                        id={notif.id}
                        title={notif.title}
                        message={notif.message}
                        close={notif.close}
                    />
                ))}
        </nav>
    );
}

export default NotificationProvider;
