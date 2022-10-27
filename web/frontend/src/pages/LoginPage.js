import React from 'react';
import Header from '../components/Header';
import Login from '../components/Login';

const LoginPage = (props) => {
    return (
        <div className='h-screen'>
            <Header
                user={props.user}
                setUser={props.setUser}
                bills={props.bills}
                setBills={props.setBills}
                budgets={props.budgets}
                setBudgets={props.setBudgets}
            />
            <Login />
        </div>
    );
};

export default LoginPage;