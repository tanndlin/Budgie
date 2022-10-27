import { React } from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header className='bg-red-500 h-16 grid grid-cols-3'>
            <h1 className='py-3 center text-center text-4xl font-bold col-start-2'>Bill Tracker</h1>
            <span className='flex flex-cols gap-x-3 m-auto col-start-3'>
                <Link
                    to={{
                        pathname: '/',
                        state: props,
                    }}
                >Home</Link>
                <Link
                    to={{
                        pathname: '/calendar',
                        state: props,
                    }}
                >Calendar</Link>
                <Link
                    to={{
                        pathname: '/list',
                        state: props,
                    }}
                >List</Link>
            </span>
        </header>
    );
};
export default Header;