import { React } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

function Header(props) {
    if (window.location.pathname == '/calendar') {
        return (
            <header className='header bg-[#BBE9E7] h-16 grid grid-cols-3 sticky top-0'>
                <img className='h-16' src={logo} alt="Bird Logo" />
                <h1 className='py-3 center text-center text-4xl font-bold'>Budgie</h1>
    
                {props.showNav && (
                    <span className='flex flex-cols gap-x-3 m-auto'>
                        <Link
                            to={{
                                pathname: '/list',
                                state: props,
                            }}
                        >List View</Link>
                        <Link
                            to={{
                                state: props,
                            }}
                        >Add New Bill</Link>
                        <Link
                            to={{
                                pathname: '/',
                                state: props,
                            }}
                        >Logout</Link>
                    </span>
                )
                }
            </header>
        );
    } else if (window.location.pathname == '/list') {
        return (
            <header className='header bg-[#BBE9E7] h-16 grid grid-cols-3 sticky top-0'>
                <img className='h-16' src={logo} alt="Bird Logo" />
                <h1 className='py-3 center text-center text-4xl font-bold'>Budgie</h1>
    
                {props.showNav && (
                    <span className='flex flex-cols gap-x-3 m-auto'>
                        <Link
                            to={{
                                pathname: '/calendar',
                                state: props,
                            }}
                        >Calendar View</Link>
                        <Link
                            to={{
                                state: props,
                            }}
                        >Add New Bill</Link>
                        <Link
                            to={{
                                pathname: '/',
                                state: props,
                            }}
                        >Logout</Link>
                    </span>
                )
                }
            </header>
        );
    } else {
        // the only other pathname is '/'
        return (
            <header className='header bg-[#BBE9E7] h-16 grid grid-cols-3 sticky top-0'>
                <img className='h-16' src={logo} alt="Bird Logo" />
                <h1 className='py-3 center text-center text-4xl font-bold'>Budgie</h1>
    
                {props.showNav && (
                    <span className='flex flex-cols gap-x-3 m-auto'>
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
                        <Link
                            to={{
                                pathname: '/',
                                state: props,
                            }}
                        >Logout</Link>
                    </span>
                )
                }
            </header>
        );
    }
};
export default Header;