import React from 'react';

function SideBar(props) {
    const defaultClassName =
        'container m-auto mt-4 sidebar' + (props.isOpen ? '' : ' sidebarClose');
    const className =
        defaultClassName + (props.className ? ` ${props.className}` : '');

    return (
        <aside id="sidebar" className={className}>
            {props.children}
        </aside>
    );
}

export default SideBar;
