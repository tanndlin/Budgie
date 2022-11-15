import React from 'react';
import { useNavigate } from 'react-router-dom';
import { pretty, sendOutsideRequest, sendRequest } from '../common/Requests';

function Login(props) {
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const navigate = useNavigate();

    const createUserProfile = (localId, callback) => {
        sendRequest(
            'CreateUserProfile',
            {
                userId: localId,
                firstName: 'Tanner',
                lastName: 'Sandlin',
                expectedIncome: 2000
            },
            (res) => {
                console.log(res);
                const user = JSON.parse(res.responseText);
                callback(user);
            },
            (err) => {
                setMessage(err);
            }
        );
    };

    const navigateToHome = (user) => {
        console.log('navigating');
        console.log(user);
        navigate('/calendar', { state: { user } });
    };

    const doLogin = async (e) => {
        e.preventDefault();

        const URL =
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7OHvwvqRgrOvgYoy2C5sgnXSZ02xLZPc';
        const payload = {
            email: props.email,
            password: password,
            returnSecureToken: true
        };

        sendOutsideRequest(
            URL,
            payload,
            (res) => {
                const { localId } = JSON.parse(res.responseText);
                console.log(localId);

                // sendRequest('CreateUserProfile', { userId: localId }, (res) => {
                // console.log(res);

                sendRequest(
                    'GetUserProfile',
                    { userId: localId },
                    (res) => {
                        console.log(res.responseText);
                        const user = JSON.parse(res.responseText);
                        console.log(user);
                        navigateToHome(user);
                    },
                    (err) => {
                        console.log('here');
                        console.log(err);
                        if (err !== "User doesn't exist") {
                            setMessage(err);
                            return;
                        }

                        setMessage('Creating a user profile');
                        createUserProfile(localId, navigateToHome);
                    }
                );
            },
            (err) => {
                console.log(err);
                setMessage(pretty(err.message));
            }
        );
    };

    function openSidebar(e) {
        e.preventDefault();
        props.openSidebar();
    }

    // to do: add on-click function for forgot password
    return (
        <section className="flex container h-full bg-[#BBE9E7] bg-opacity-50 rounded-md">
            <div
                className={
                    'w-3/4 py-4 h-3/4 m-auto bg-[#b2c6ec] bg-opacity-[.7] rounded-md duration-300' +
                    (!props.dividerToggle ? ' shrink' : '')
                }
            >
                <h1
                    className="text-center text-[#3B3548] text-6xl mb-16"
                    data-testid="loginHeader"
                >
                    Log In
                </h1>

                <form
                    className="grid grid-rows-4 h-1/2 place-items-center"
                    onSubmit={doLogin}
                >
                    <input
                        className="row-start-1 px-1 placeholder-[#4D4D4D] rounded-md"
                        type="text"
                        data-testid="email"
                        placeholder="Email"
                        onChange={(e) => props.setEmail(e.target.value)}
                        value={props.email}
                    />
                    <input
                        className="row-start-2 px-1 placeholder-[#4D4D4D] rounded-md"
                        type="password"
                        data-testid="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="row-start-4 flex flex-col">
                        <input
                            className="w-40 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md"
                            type="submit"
                            value="Log In"
                            onClick={doLogin}
                        />
                        <button
                            className="ml-4 text-[#189DFD] hover:text-[#3818FD]"
                            onClick={openSidebar}
                        >
                            Forgot Password?
                        </button>
                    </span>
                </form>
                <footer className="flex">
                    <span className="m-auto">{message}</span>
                </footer>
            </div>
        </section>
    );
}
export default Login;
