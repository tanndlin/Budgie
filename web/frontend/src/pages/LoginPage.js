import React from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Divider from '../components/Divider';

const LoginPage = (props) => {
    return (
        <article className="min-h-minus-header h-1 flex">
            <main className='grid grid-cols-2 w-3/4 max-w-[960px] m-auto relative min-w-[500px] h-3/4 max-h-[615px]'>
                <Login />
                <SignUp />
                <Divider />
            </main>
        </article>
    );
};

export default LoginPage;