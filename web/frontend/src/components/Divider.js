import React from 'react';
import DividerImage from '../img/divider.jpg';
import bwLogo from '../img/bwLogo.png';

function Divider(props) {
    const dividerPositionClass = ' transform -translate-x-full';

    const arrowClassName = 'duration-300 arrow h-16 w-16 absolute top-1/2 float-left transform -translate-y-1/2 ';

    const leftClassName = arrowClassName + '-rotate-90 left';
    const rightClassName = arrowClassName + 'rotate-90 right';

    // to do: add on-click function for forgot password
    return (
        <div id='divider' className={"duration-300 w-1/2 min-h-[348px] absolute right-0 group transform h-full" + (props.dividerToggle ? '' : dividerPositionClass)} onClick={() => { props.setDividerToggle(!props.dividerToggle) }}>
            <img className='absolute rounded-md h-full w-full' src={DividerImage} alt='Wood Texture' />
            <img id='bwLogo' className='absolute h-full w-full' src={bwLogo} alt='Bird Logo' />

            <svg className={!props.dividerToggle ? rightClassName : leftClassName} xmlns="http://www.w3.org/2000/svg" width="72" height="72" version="1.0" viewBox="0 0 54 54">
                <path d="M12.7 13.5C.9 23.2-.8 25.8 2.2 28.8c2.4 2.4 5.5 1 14.3-6.3 5-4.1 9.6-7.5 10.4-7.5.7 0 5 3.1 9.5 6.9 9.9 8.4 12 9.5 14.5 8.2 2.2-1.2 3.3-3.5 2.5-5.5-.3-.8-5.5-5.5-11.5-10.6-15.2-12.7-14.6-12.6-29.2-.5z" /><path d="M12.7 32.5C.9 42.2-.8 44.8 2.2 47.8c2.4 2.4 5.5 1 14.3-6.3 5-4.1 9.6-7.5 10.4-7.5.7 0 5 3.1 9.5 6.9 9.9 8.4 12 9.5 14.5 8.2 2.2-1.2 3.3-3.5 2.5-5.5-.3-.8-5.5-5.5-11.5-10.6-15.2-12.7-14.6-12.6-29.2-.5z" />
            </svg>
        </div>
    );
};

export default Divider;