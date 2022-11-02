import React from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Divider from '../components/Divider';

const LoginPage = (props) => {
    return (
        <div className='grid grid-cols-2 h-64 my-40 min-w-1/2 w-auto mx-[250px] relative'>
            <Login />
            <SignUp />
            <Divider />
            {/* <div className='absolute right-0'>
                <Divider />
            </div> */}
        </div>
    );
};

export default LoginPage;