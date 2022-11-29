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
    const [sidebarClassName, setSidebarClassName] = React.useState(
        ' forgotPasswordClosed'
    );

    const openSidebar = () => {
        setIsOpen(true);

        setTimeout(() => {
            setSidebarClassName('');
        }, 100);
    };

    const closeSidebar = () => {
        setSidebarClassName(' forgotPasswordClosed');

        setTimeout(() => {
            setIsOpen(false);
        }, 500);
    };

    return (
        <article className="min-h-minus-header h-1 flex flex-col">
            <main className="grid place-items-center w-full h-full">
                <div className="">
                    <section className="grid grid-cols-2 max-w-[960px] mx-auto relative min-w-[500px] w-[70vw] h-[40vh] min-h-[500px] max-h-[615px]">
                        <Login
                            email={loginEmail}
                            setEmail={setLoginEmail}
                            dividerToggle={dividerToggle}
                            openSidebar={openSidebar}
                            pushNotification={props.pushNotification}
                            removeNotification={props.removeNotification}
                        />
                        <SignUp
                            {...{
                                loginEmail,
                                setLoginEmail,
                                dividerToggle,
                                setDividerToggle
                            }}
                        />
                        <Divider
                            {...{
                                dividerToggle,
                                setDividerToggle
                            }}
                        />
                    </section>
                    {isOpen && (
                        <SideBar
                            className={`forgotPassword h-1/4${sidebarClassName}`}
                            isOpen={isOpen}
                        >
                            <ForgotPassword closeSidebar={closeSidebar} />
                        </SideBar>
                    )}
                </div>
            </main>
        </article>
    );
};

export default LoginPage;
