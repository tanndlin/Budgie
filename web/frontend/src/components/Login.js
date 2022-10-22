import React, { useState } from 'react';

function Login() {
    var loginName;
    var loginPassword;
    const [message, setMessage] = useState('');

    const doLogin = async event => {
        event.preventDefault();
        var obj = { login: loginName.value, password: loginPassword.value };
        var js = JSON.stringify(obj);
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST', body: js, headers: {
                    'Content-Type': 'application/json'
                }
            });
            var res = JSON.parse(await response.text());
            if (res.id <= 0) {
                setMessage('User/Password combination incorrect');
            }
            else {
                var user =
                    { firstName: res.firstName, lastName: res.lastName, id: res.id }
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/cards';
            }
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };

    return (
        <main className='flex bg-orange-200 h-9/10'>
            <div className='grid container m-auto min-h-1/3 bg-yellow-200 place-items-center flex-1'
                id='loginDiv'>
                <form onSubmit={doLogin}>
                    <span id='inner-title'>Please Log In</span><br />
                    <input className='mt-5 px-2' type='text' id='loginName' placeholder='Username'
                        ref={(c) => loginName = c} /><br />
                    <input className='mt-5 mb-5 px-2' type='password' id='loginPassword' placeholder='Password'
                        ref={(c) => loginPassword = c} /><br />
                    <input type='submit' id='loginButton' className='w-40 bg-red-500' value='Log in'
                        onClick={doLogin} />
                </form>
                <span id='loginResult'>{message}</span>
            </div>
        </main>
    );
};
export default Login;