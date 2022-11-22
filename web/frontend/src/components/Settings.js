import React from 'react';
import BackgroundToggle from './BackgroundToggle';

function Settings(props) {
    const resetPassword = () => {
        return;
    };

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
                    className="w-40 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md shadow-md"
                    type="submit"
                    value="Reset Password"
                    onClick={resetPassword}
                />

                <input
                    className="w-40 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md shadow-md"
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
