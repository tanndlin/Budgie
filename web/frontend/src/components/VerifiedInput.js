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
                className={`absolute right-0 h-[24px] w-[24px] ${isValid}`}
            ></span>
            <input
                className="px-1 placeholder-[#4D4D4D] rounded-md"
                type={props.type ?? 'text'}
                placeholder={props.placeholder}
                onChange={onChange}
                value={props.value}
            />
        </div>
    );
}

export default VerifiedInput;
