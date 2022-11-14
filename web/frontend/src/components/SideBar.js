import React from 'react';
import CreateBillPopUp from './CreateBillPopUp';

function SideBar(props) {

    const className = 'container mt-4 bg-[#b2c6ec] bg-opacity-[.7] sidebar' + (props.isOpen ? '' : ' sidebarClose');


    return (
        <aside className={className}>
            <CreateBillPopUp
                {...props}
            />
        </aside>
    );
}

export default SideBar;