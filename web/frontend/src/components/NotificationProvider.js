import React from 'react';
import Notification from './Notification';

function NotificationProvider(props) {
    return (
        <nav className="absolute top-[5rem] left-[1rem] grid grid-flow-row gap-4 notificationProvider">
            {props.notifications &&
                props.notifications.map((notif) => {
                    return (
                        <Notification
                            {...notif}
                            key={notif.id}
                            removeNotification={props.removeNotification}
                        />
                    );
                })}
        </nav>
    );
}

export default NotificationProvider;
