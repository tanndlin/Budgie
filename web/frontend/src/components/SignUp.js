import React, { useState } from 'react';
import { pretty, sendOutsideRequest } from '../common/Requests';
import { verifyEmail, verifyPassword } from '../common/verify';
import VerifiedInput from './VerifiedInput';

function SignUp(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState('');

    const doSignUp = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        const URL =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7OHvwvqRgrOvgYoy2C5sgnXSZ02xLZPc';
        const payload = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        sendOutsideRequest(
            URL,
            payload,
            (_res) => {
                setMessage('Account created successfully');
                props.setLoginEmail(email);

                setEmail('');
                setPassword('');
                setConfirmPassword('');

                setTimeout(() => {
                    props.setDividerToggle(true);
                    setMessage('');
                }, 1000);
            },
            (err) => {
                console.log(err);
                setMessage(pretty(err.message));
            }
        );
    };

    return (
        <section className="flex container h-full bg-[#BBE9E7] bg-opacity-50 rounded-md">
            <div
                className={
                    'w-3/4 py-4 h-3/4 m-auto bg-[#b2c6ec] bg-opacity-[.7] rounded-md duration-300' +
                    (props.dividerToggle ? ' shrink' : '')
                }
            >
                <h1 className="text-center text-[#3B3548] text-6xl mb-16">
                    Sign Up
                </h1>

                <form
                    className="grid grid-rows-4 h-1/2 place-items-center"
                    onSubmit={doSignUp}
                >
                    <VerifiedInput
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        validator={verifyEmail}
                    />

                    <VerifiedInput
                        placeholder="Password"
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        validator={verifyPassword}
                    />

                    <VerifiedInput
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        validator={(val) => val === password}
                    />

                    <input
                        className="w-40 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md"
                        type="submit"
                        value="Sign Up"
                        onClick={doSignUp}
                    />
                </form>
                <footer className="flex">
                    <span className="m-auto">{message}</span>
                </footer>
            </div>
        </section>
    );
}
export default SignUp;
