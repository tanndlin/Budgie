import React from 'react';

function Notification(props) {
    const getClassName = () => {
        const defaultClassName =
            'relative flex flex-col bg-[#b2c6ec] bg-opacity-[.9] rounded-md p-4 shadow-lg w-max z-50';

        if (props.close) {
            return defaultClassName + ' notifClose';
        }

        return defaultClassName;
    };

    return (
        <div className={getClassName()}>
            <span className="flex flex-row justify-between w-full border-b-2 border-black">
                <h1 className="font-bold text-2xl">{props.title}</h1>
                <span className="loader" />
            </span>
            <p className="m-auto text-lg">{props.message}</p>
        </div>
    );
}

export default Notification;
