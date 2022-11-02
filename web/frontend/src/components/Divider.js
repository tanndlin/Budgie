import React, { useState } from 'react';
import DividerImage from './pexels-james-frid-1098764_edit4.png';

function Divider() {
    const [divider_position, setDivider_Position] = useState(true);
    const dividerPositionClass = ' transform -translate-x-[-50%]';

    const leftClassName = 'h-40 w-40 -rotate-90 absolute top-[150px] left-0 float-left group-hover:fill-[#3818FD]';
    const rightClassName = 'h-40 w-40 rotate-90 absolute top-[150px] right-1/2 float-left group-hover:fill-[#3818FD]';

    const doMoveDivider = function () {
        setDivider_Position(!divider_position);
    };

    // to do: add on-click function for forgot password
    return (
        <div id='divider' className={"transition-[1s] w-full absolute right-0 group transform" + (divider_position ? null : dividerPositionClass)} onClick={() => { doMoveDivider() }}>
            <div className=''>
                <img className='min-h-max h-[480px] w-1/2' src={DividerImage} />
                <svg className={leftClassName + (divider_position && ' invisible')} xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 144 144">
                    <path d="M57.7 63.5c-11.8 9.7-13.5 12.3-10.5 15.3 2.4 2.4 5.5 1 14.3-6.3 5-4.1 9.6-7.5 10.4-7.5.7 0 5 3.1 9.5 6.9 9.9 8.4 12 9.5 14.5 8.2 2.2-1.2 3.3-3.5 2.5-5.5-.3-.8-5.5-5.5-11.5-10.6-15.2-12.7-14.6-12.6-29.2-.5z" /><path d="M57.7 82.5c-11.8 9.7-13.5 12.3-10.5 15.3 2.4 2.4 5.5 1 14.3-6.3 5-4.1 9.6-7.5 10.4-7.5.7 0 5 3.1 9.5 6.9 9.9 8.4 12 9.5 14.5 8.2 2.2-1.2 3.3-3.5 2.5-5.5-.3-.8-5.5-5.5-11.5-10.6-15.2-12.7-14.6-12.6-29.2-.5z" />
                </svg>
                <svg className={rightClassName + (!divider_position && ' invisible')} xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 144 144">
                    <path d="M57.7 63.5c-11.8 9.7-13.5 12.3-10.5 15.3 2.4 2.4 5.5 1 14.3-6.3 5-4.1 9.6-7.5 10.4-7.5.7 0 5 3.1 9.5 6.9 9.9 8.4 12 9.5 14.5 8.2 2.2-1.2 3.3-3.5 2.5-5.5-.3-.8-5.5-5.5-11.5-10.6-15.2-12.7-14.6-12.6-29.2-.5z" /><path d="M57.7 82.5c-11.8 9.7-13.5 12.3-10.5 15.3 2.4 2.4 5.5 1 14.3-6.3 5-4.1 9.6-7.5 10.4-7.5.7 0 5 3.1 9.5 6.9 9.9 8.4 12 9.5 14.5 8.2 2.2-1.2 3.3-3.5 2.5-5.5-.3-.8-5.5-5.5-11.5-10.6-15.2-12.7-14.6-12.6-29.2-.5z" />
                </svg>
            </div>
        </div>
    );
};
export default Divider;