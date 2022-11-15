import React from 'react';

function SideBar(props) {
    const defaultClassName =
        'container m-auto mt-4 bg-[#b2c6ec] bg-opacity-[.7] sidebar' +
        (props.isOpen ? '' : ' sidebarClose');
    const className =
        defaultClassName + (props.className ? ` ${props.className}` : '');

    return (
        <aside id="sidebar" className={className}>
            {props.children}
        </aside>
    );
}

export default SideBar;
