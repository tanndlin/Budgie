import React from 'react';
import { useState, useEffect } from 'react';
import BackgroundImage from '../img/divider_v2.jpg';

function AccountPage(props) {
    if (props.user === null) {
        // Check url for localId
        const url = new URL(window.location.href);
        const localId = url.searchParams.get('user');
        if (localId) {
            // If localId is found, set user to localId
            props.setUser(localId);

            // TODO: Hydrate bills and budgets
        } else {
            // If localId is not found, redirect to login page
            window.location.href = '/';
        }
    }

    const backgroundImage = 'fixed h-full w-full opacity-70 object-fill';
    let [backgroundToggle2, setBackgroundToggle2] = useState(() => {
        const saved = localStorage.getItem("backgroundToggle2");
        const initialValue = JSON.parse(saved);
        return initialValue || null;
    });
    const ChangeBackgroundToggle2 = () => {
        if (backgroundToggle2 == null) {
            setBackgroundToggle2(true);
        } else if (backgroundToggle2 === false) {
            setBackgroundToggle2(true);
        } else {
            // backgroundToggle2 == true
            setBackgroundToggle2(false);
        }
        return backgroundToggle2;
    };
    useEffect(() => {
        localStorage.setItem("backgroundToggle2", JSON.stringify(backgroundToggle2))
    }, [backgroundToggle2]);

    return (
        <div className=''>
            { !backgroundToggle2 && (
                <img className={backgroundImage} src={BackgroundImage} alt='Wooden Texture' />
            )}
            <div className="fixed h-full w-full object-fill overflow-y-auto snap-x scroll-smooth">
                <div className='mt-5 max-w-[175px] m-auto bg-[#BBE9E7] bg-opacity-90 p-3 rounded-md'>
                    <input className='font-bold text-center hover:text-[#189DFD]' type='button' value='Background Toggle'
                        onClick={() => ChangeBackgroundToggle2()} />
                </div>
                <article className="m-auto my-5 container bg-[#BBE9E7] bg-opacity-90 p-3 rounded-md">
                    <div className="flex flex-row justify-between font-bold border-black border-b-2 p-1">
                        <h1 className="text-2xl">Account Information:</h1>
                    </div>
                    <div>
                        <p className='my-10'>placeholder text, display email here</p>
                    </div>
                    <footer className='border-black border-t-2 p-1 flex flex-row gap-4'>
                        <input className='px-2 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md' type='button' value='Change Email'/>
                        <input className='px-2 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md' type='button' value='Reset Password'/>
                    </footer>
                </article>
            </div>
        </div>
    );
}

export default AccountPage;
