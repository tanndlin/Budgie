import React from 'react';

function VerifiedInput(props) {
    const [isValid, setIsValid] = React.useState('invalid');

    const onChange = (e) => {
        setIsValid(props.validator(e.target.value) ? 'valid' : 'invalid');
        props.onChange(e);
    };

    return (
        <div className="relative">
            <span
                className={`absolute right-0 h-[24px] w-[24px] verify-icon ${isValid}`}
                onMouseOver={(e) => {
                    if (isValid === 'invalid') {
                        e.target.nextSibling.nextSibling.style.display =
                            'block';
                    }
                }}
                onMouseOut={(e) => {
                    e.target.nextSibling.nextSibling.style.display = 'none';
                }}
            ></span>
            <input
                className="px-1 placeholder-[#4D4D4D] rounded-md"
                type={props.type ?? 'text'}
                placeholder={props.placeholder}
                onChange={onChange}
                value={props.value}
            />
            <span className="absolute hidden hover:visible tooltip z-50 bg-gray-500 text-white p-1 rounded-md left-full w-40">
                {props.tooltip}
            </span>
        </div>
    );
}

export default VerifiedInput;
