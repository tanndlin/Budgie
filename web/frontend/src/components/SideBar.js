import React from 'react';
import CreateEvent from './CreateEvent';

function SideBar(props) {

    const className = 'container bg-[#b2c6ec] bg-opacity-[.7]' + (props.isOpen ? ' sidebar' : ' sidebarClose');


    return (
        <aside className={className}>
            <CreateEvent
                {...props}
            />
        </aside>
    );
}

export default SideBar;