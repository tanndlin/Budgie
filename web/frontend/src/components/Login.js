import React from 'react';
import { sendOutsideRequest } from '../common/Requests';

function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const doLogin = async (e) => {
        e.preventDefault()

        const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7OHvwvqRgrOvgYoy2C5sgnXSZ02xLZPc';
        const payload = {
            "email": username,
            "password": password,
            "returnSecureToken": true
        }


        sendOutsideRequest(URL, payload, (res) => {
            const { localId } = JSON.parse(res.responseText);
            console.log(localId);
        }, (err) => {
            console.log(err);
        });
    };

    // to do: add on-click function for forgot password
    return (
        <main className='flex'>
            <div className='grid place-items-center container bg-[#BBE9E7] bg-opacity-[.55] rounded-l-[10px] flex-1'
                id='loginDiv'>
                <form onSubmit={doLogin}>
                    <span className='grid place-items-center text-[#3B3548] text-[64px]' id='inner-title'>Log In</span><br />
                    <div className='grid place-items-center w-80 h-80 my-[20px] bg-[#b2c6ec] bg-opacity-[.7] rounded-[10px] overflow-hidden'>
                        <input className='mt-[100px] px-[5px] placeholder-[#4D4D4D] rounded-[10px]' type='text' id='loginName' placeholder='Email'
                            ref={(c) => loginName = c} /><br />
                        <input className='mb-[5px] px-[5px] placeholder-[#4D4D4D] rounded-[10px]' type='password' id='loginPassword' placeholder='Password'
                            ref={(c) => loginPassword = c} /><br />
                        <input className='w-40 mx-[5px] bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD]' type='submit' id='loginButton' value='Log in'
                            onClick={doLogin} />
                        <input className='mb-[100px] w-40 mx-[5px] text-[#189DFD] hover:text-[#3818FD]' type='submit' id='forgotPassword' value='forgot password?'
                        />
                    </div>
                </form>
                <span id='loginResult'></span>
            </div>
        </main>
    );
};
export default Login;