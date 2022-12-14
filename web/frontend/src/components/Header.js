import { React } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

function Header(props) {
    return (
        <header className="bg-[#BBE9E7] h-16 grid grid-cols-3 sticky top-0 z-50">
            <a href="/">
                <img className="h-16" src={logo} alt="Bird Logo" />
            </a>
            <h1 className="py-3 center text-center text-4xl font-bold">
                Budgie
            </h1>

            {props.showNav && (
                <span className="flex flex-cols gap-x-3 m-auto">
                    {/* // TODO: Move this somewhere else */}
                    <Link
                        className="font-bold hover:text-[#189DFD]"
                        to={{
                            pathname: '/calendar',
                            state: props
                        }}
                    >
                        Calendar
                    </Link>

                    <Link
                        className="font-bold hover:text-[#189DFD]"
                        to={{
                            pathname: '/account',
                            state: props
                        }}
                    >
                        My Account
                    </Link>
                </span>
            )}
        </header>
    );
}
export default Header;
