import React from 'react';

function BackgroundToggle(props) {
    return (
        <div>
            <label htmlFor="Background Toggle">Toggle Background</label>
            <div
                className="background-toggle"
                onClick={() =>
                    props.setBackgroundToggle(!props.backgroundToggle)
                }
            >
                <span
                    className={
                        'indicator indicator-' +
                        `${props.backgroundToggle ? 'on' : 'off'}`
                    }
                ></span>
            </div>
        </div>
    );
}

export default BackgroundToggle;
