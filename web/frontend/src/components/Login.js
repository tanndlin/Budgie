import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../common/Requests';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../common/firebaseConfig';
function Login(props) {
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const navigate = useNavigate();

    const createUserProfile = (uid, callback) => {
        const id = props.pushNotification('Creating Profile', 'Please wait...');
        sendRequest(
            'CreateUserProfile',
            {
                userId: uid,
                firstName: 'First Name',
                lastName: 'Last Name',
                expectedIncome: 0
            },
            (res) => {
                const user = JSON.parse(res.responseText);
                props.removeNotification(id);
                callback(user);
            },
            (err) => {
                setMessage(err);
            }
        );
    };

    const navigateToHome = (user) => {
        navigate('/calendar', { state: { user } });
    };

    const proceed = (uid) => {
        const id = props.pushNotification(
            'Retrieving Profile',
            'Please wait...'
        );

        sendRequest(
            'GetUserProfile',
            { userId: uid },
            (res) => {
                props.removeNotification(id);
                const user = JSON.parse(res.responseText);
                navigateToHome(user);
            },
            (err) => {
                console.log(err);
                if (err !== "User doesn't exist") {
                    setMessage(err);
                    return;
                }

                createUserProfile(uid, navigateToHome);
            }
        );
    };

    const doLogin = async (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, props.email, password)
            .then((userCredential) => {
                console.log(userCredential);
                const uid = userCredential.user.uid;

                if (!userCredential.user.emailVerified) {
                    setMessage('Please verify your email address.');
                    return;
                }

                proceed(uid);
            })
            .catch((error) => {
                console.log(error);
                setMessage(error.message);
            });
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
