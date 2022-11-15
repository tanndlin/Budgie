import React from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Divider from '../components/Divider';
import SideBar from '../components/SideBar';
import ForgotPassword from '../components/ForgotPassword';

const LoginPage = (props) => {
    const [loginEmail, setLoginEmail] = React.useState('');
    const [dividerToggle, setDividerToggle] = React.useState(true);
    const [isOpen, setIsOpen] = React.useState(false);

    const openSidebar = () => {
        setIsOpen(true);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };


    const getClassName = () => {
        const defaultClassName = 'grid grid-cols-2 w-3/4 max-w-[960px] m-auto relative min-w-[500px] h-3/4 max-h-[615px]';
        if (!isOpen)
            return defaultClassName;
        else
            return `${defaultClassName} mb-4`;


    }

    return (
        <article className="min-h-minus-header h-1 flex flex-col">
            <main className='flex flex-col h-full'>
                <section className={getClassName()}>
                    <Login
                        email={loginEmail}
                        setEmail={setLoginEmail}
                        dividerToggle={dividerToggle}
                        openSidebar={openSidebar}
                    />
                    <SignUp
                        {...{
                            loginEmail,
                            setLoginEmail,
                            dividerToggle,
                            setDividerToggle,
                        }}
                    />
                    <Divider
                        {...{
                            dividerToggle,
                            setDividerToggle,
                        }}
                    />
                </section>

                <SideBar
                    className='max-w-[960px] m-auto mt-0'
                    isOpen={isOpen}>
                    <ForgotPassword
                        closeSidebar={closeSidebar}
                    />
                </SideBar>
            </main>
        </article>
    );
};

export default LoginPage;