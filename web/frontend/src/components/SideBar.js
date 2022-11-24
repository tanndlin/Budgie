import React from 'react';

function SideBar(props) {
    const defaultClassName =
        'container mx-auto sidebar grid place-items-center' +
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
