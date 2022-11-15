import React from 'react';

function SideBar(props) {
    return (
        <aside className={'container mt-4 bg-[#b2c6ec] bg-opacity-[.7] sidebar' + (props.isOpen ? '' : ' sidebarClose')}>
            {props.children}
        </aside>
    );
}

export default SideBar;