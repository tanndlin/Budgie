import React from 'react';
import { pretty, sendOutsideRequest } from '../common/Requests';

function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [message, setMessage] = React.useState('');

    const doLogin = async (e) => {
        e.preventDefault()

        const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7OHvwvqRgrOvgYoy2C5sgnXSZ02xLZPc';
        const payload = {
            "email": email,
            "password": password,
            "returnSecureToken": true
        }


        sendOutsideRequest(URL, payload, (res) => {
            const { localId } = JSON.parse(res.responseText);
            console.log(localId);

            // Go to calendar page
            window.location.href = '/calendar';
        }, (err) => {
            console.log(err);
            setMessage(pretty(err.message));
        });
    };

    // to do: add on-click function for forgot password
    return (
        <section className='flex container h-full bg-[#BBE9E7] bg-opacity-50 rounded-md'>
            <div className='w-3/4 py-4 h-3/4 m-auto bg-[#b2c6ec] bg-opacity-[.7] rounded-md'>
                <h1 className='text-center text-[#3B3548] text-6xl mb-16'>Log In</h1>

                <form className='grid grid-rows-4 h-1/2 place-items-center' onSubmit={doLogin}>
                    <input className='row-start-1 px-1 placeholder-[#4D4D4D] rounded-md' type='text' placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)} />
                    <input className='row-start-2 px-1 placeholder-[#4D4D4D] rounded-md' type='password' placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)} />
                    <input className='row-start-4 w-40 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md' type='submit' value='Log In'
                        onClick={doLogin} />
                </form>
                <footer className='flex'>
                    <span className='m-auto' id='loginResult'>{message}</span>
                </footer>
            </div>
        </section>
    );
};
export default Login;