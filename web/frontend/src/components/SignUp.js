import React, { useState } from 'react';

function SignUp() {
    var signUpEmail;
    var signUpPassword;
    var signUpConfirmPassword;
    const [message, setMessage] = useState('');

    const doSignUp = async event => {
        // to do
    };

    return (
        <section className='flex'>
            <div className='grid pb-4 container bg-[#BBE9E7] bg-opacity-[.55] rounded-md flex-1'
                id='signUpDiv'>
                <form onSubmit={doSignUp}>
                    <span className='grid place-items-center text-[#3B3548] text-[64px]' id='inner-title'>Sign Up</span><br />
                    <div className='grid place-items-center w-3/4 m-auto bg-[#b2c6ec] bg-opacity-[.7] rounded-md'>
                        <input className='mt-[100px] px-[5px] placeholder-[#4D4D4D] rounded-md' type='text' id='signUpEmail' placeholder='Email'
                            ref={(c) => signUpEmail = c} /><br />
                        <input className='px-[5px] placeholder-[#4D4D4D] rounded-md' type='password' id='signUpPassword' placeholder='Password'
                            ref={(c) => signUpPassword = c} /><br />
                        <input className='mb-[5px] px-[5px] placeholder-[#4D4D4D] rounded-md' type='password' id='signUpConfirmPassword' placeholder='Confirm Password'
                            ref={(c) => signUpConfirmPassword = c} /><br />
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