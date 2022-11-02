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

    return (
        <main className='flex h-minus-header'>
            <div className='grid container m-auto min-h-1/3 bg-yellow-200 place-items-center flex-1'
                id='loginDiv'>
                <form className='grid grid-cols-1 gap-6' onSubmit={doLogin}>
                    <div className='grid grid-cols-1 gap-2'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' name='username' id='username' value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='grid grid-cols-1 gap-2'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' id='password' value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='grid grid-cols-1 gap-2'>
                        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Login</button>
                    </div>
                </form>
                <span id='loginResult'></span>
            </div>
        </main>
    );
};
export default Login;