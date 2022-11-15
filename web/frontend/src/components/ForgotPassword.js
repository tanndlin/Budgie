import React from 'react';

function ForgotPassword(props) {
    const [email, setEmail] = React.useState('');
    // eslint-disable-next-line no-unused-vars
    const [message, setMessage] = React.useState('Link was sent');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email);
    };

    return (
        <section className='relative flex container bg-[#BBE9E7] bg-opacity-50 rounded-md shadow-lg'>
            <input className='absolute top-0 right-0 cursor-pointer text-[36px] font-bold mr-4' type='button' value='&times;' onClick={props.closeSidebar} />
            <div className='container w-3/4 py-4 my-4 h-3/4 m-auto bg-[#b2c6ec] bg-opacity-[.7] rounded-md shadow-lg'>

                <h1 className='text-center text-[#3B3548] text-6xl mb-4' data-testid='loginHeader'>Forgot Password</h1>
                <div className='flex flex-row'>
                    <p className='text-[#1A1A1A] text-center px-4 w-1/4 border-r-2 border-black'>Enter your email address and we'll send you a link to reset your password.</p>

                    <form className='w-3/4'>
                        <span className='grid place-items-center'>
                            <input
                                type='email'
                                className='w-3/4 max-w-[400px] mt-8 h-10 placeholder-[#4D4D4D] rounded-md p-2'
                                value={email} onChange={e => setEmail(e.target.value)}
                                placeholder='Email'
                            />
                        </span>

                        <span className='flex'>
                            <input className='m-auto mt-4 w-40 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md' type='submit' value='Send Reset Link'
                                onClick={handleSubmit} />
                        </span>

                        <footer className='flex'>
                            <span className='m-auto mt-8'>{message}</span>
                        </footer>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default ForgotPassword;