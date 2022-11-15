import React from 'react';
import { pretty, sendOutsideRequest } from '../common/Requests';
import sha256 from 'js-sha256';

function Login(props) {
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');

    const doLogin = async (e) => {
        e.preventDefault()

        const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7OHvwvqRgrOvgYoy2C5sgnXSZ02xLZPc';
        const payload = {
            "email": props.email,
            "password": sha256(password),
            "returnSecureToken": true
        }

        sendOutsideRequest(URL, payload, (res) => {
            const { localId } = JSON.parse(res.responseText);
            console.log(localId);

            // Redirect to calendar page and pass states
            window.location.href = `/calendar?user=${localId}`;
        }, (err) => {
            console.log(err);
            setMessage(pretty(err.message));
        });
    };

    // to do: add on-click function for forgot password
    return (
        <section className='flex container h-full bg-[#BBE9E7] bg-opacity-50 rounded-md'>
            <div className={'w-3/4 py-4 h-3/4 m-auto bg-[#b2c6ec] bg-opacity-[.7] rounded-md duration-300' + (!props.dividerToggle ? ' shrink' : '')}>
                <h1 className='text-center text-[#3B3548] text-6xl mb-16' data-testid='loginHeader'>Log In</h1>

                <form className='grid grid-rows-4 h-1/2 place-items-center' onSubmit={doLogin}>
                    <input className='row-start-1 px-1 placeholder-[#4D4D4D] rounded-md' type='text' data-testid='email' placeholder='Email'
                        onChange={(e) => props.setEmail(e.target.value)} value={props.email} />
                    <input className='row-start-2 px-1 placeholder-[#4D4D4D] rounded-md' type='password' data-testid='password' placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)} />
                    <span className='row-start-4 flex flex-col'>
                        <input className='w-40 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md' type='submit' value='Log In'
                            onClick={doLogin} />
                        <button className='ml-4 text-[#189DFD] hover:text-[#3818FD]' onClick={props.openSidebar}>Forgot Password?</button>
                    </span>
                </form>
                <footer className='flex'>
                    <span className='m-auto'>{message}</span>
                </footer>
            </div>
        </section>
    );
};
export default Login;