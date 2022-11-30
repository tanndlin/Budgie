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

    const callback = (confirm) => {
        if (props.callback && confirm) {
            props.callback();
        }

        props.removeNotification(props.id);
    };

    return (
        <div className={getClassName()}>
            <span className="flex flex-row justify-between w-full border-b-2 border-black">
                <h1 className="font-bold text-2xl">{props.title}</h1>
                <span className="loader" />
            </span>
            <p className="m-auto text-lg">{props.message}</p>
            {props.isConfirmation && (
                <div className="flex flex-row justify-between w-full">
                    <span
                        className="w-5 h-5 valid"
                        onClick={() => {
                            callback(true);
                        }}
                    />
                    <span
                        className="w-5 h-5 invalid"
                        onClick={() => {
                            callback(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default Notification;
