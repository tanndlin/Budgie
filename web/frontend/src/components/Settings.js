/* eslint-disable no-unused-vars */
import React from 'react';
import BackgroundToggle from './BackgroundToggle';
import { auth } from '../common/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

function Settings(props) {
    return (
        <footer>
            <h2 className="font-bold text-xl border-b-2 border-black mb-4">
                Settings
            </h2>
            <BackgroundToggle
                backgroundToggle={props.backgroundToggle}
                setBackgroundToggle={props.setBackgroundToggle}
            />
            <span className="flex gap-4 pt-4">
                <input
                    className="w-40 h-10 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md shadow-md"
                    type="submit"
                    value="Log Out"
                    onClick={() => {
                        window.location.href = '/';
                    }}
                />
            </span>
        </footer>
    );
}

export default Settings;
