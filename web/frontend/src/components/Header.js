import { React } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

function Header(props) {
    return (
        <header className='bg-[#BBE9E7] h-16 grid grid-cols-3'>
            <img className='h-16' src={logo} alt="Bird Logo" />
            <h1 className='py-3 center text-center text-4xl font-bold'>Budgie</h1>

            {props.showNav && (
                <span className='flex flex-cols gap-x-3 m-auto'>
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
            )
            }
        </header>
    );
};
export default Header;