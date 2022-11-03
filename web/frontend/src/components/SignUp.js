import React, { useState } from 'react';
import { sendOutsideRequest } from '../common/Requests';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState('');


    const doSignUp = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7OHvwvqRgrOvgYoy2C5sgnXSZ02xLZPc';
        const payload = {
            "email": email,
            "password": password,
            "returnSecureToken": true
        }


        sendOutsideRequest(URL, payload, (res) => {
            const { localId } = JSON.parse(res.responseText);
            console.log(localId);

            setMessage('Account created successfully');
        }, (res) => {
            console.log(res);
            setMessage(res.error.message);
        });
    };

    return (
        <section className='flex'>
            <div className='grid pb-4 container bg-[#BBE9E7] bg-opacity-[.55] rounded-md flex-1'
                id='signUpDiv'>
                <form onSubmit={doSignUp}>
                    <span className='grid place-items-center text-[#3B3548] text-[64px]' id='inner-title'>Sign Up</span><br />
                    <div className='grid place-items-center w-3/4 m-auto bg-[#b2c6ec] bg-opacity-[.7] rounded-md'>
                        <input className='mt-[100px] px-[5px] placeholder-[#4D4D4D] rounded-md' type='text' id='signUpEmail' placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)} /><br />
                        <input className='px-[5px] placeholder-[#4D4D4D] rounded-md' type='password' id='signUpPassword' placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)} /><br />
                        <input className='mb-[5px] px-[5px] placeholder-[#4D4D4D] rounded-md' type='password' id='signUpConfirmPassword' placeholder='Confirm Password'
                            onChange={(e) => setConfirmPassword(e.target.value)} /><br />
                        <input className='mb-[100px] w-40 mx-[5px] bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD]' type='submit' id='signUpButton' value='Sign Up'
                            onClick={doSignUp} />
                    </div>
                </form>
                <span id='signUpResult'>{message}</span>
            </div>
        </section>
    );
};
export default SignUp;