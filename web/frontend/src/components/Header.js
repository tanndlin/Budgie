import React from 'react';

function Header() {
    return (
        <header className='bg-red-500 h-16 grid grid-cols-3'>
            <h1 className='py-3 center text-center text-4xl font-bold col-start-2'>Bill Tracker</h1>
            <span className='flex flex-cols gap-x-3 m-auto col-start-3'>
                <a href='/'>Home</a>
                <a href='/calendar'>Calendar</a>
                <a href='/list'>List</a>
            </span>
        </header>
    );
};
export default Header;