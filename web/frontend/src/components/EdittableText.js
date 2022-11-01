import React from 'react';

function EdittableText(props) {

    function onChange(e) {
        const value = e.target.value;
        if (value > props.max) {
            e.target.value = props.max;
        }

        props.onChange(e);
    }

    function onBlur(e) {
        if (!e.target.value)
            e.target.value = '0';
    }

    return (
        <input
            onChange={onChange}
            onBlur={onBlur}
            className='font-bold editable'
            type={props.type}
            value={props.value}
            style={{ width: `${Math.max(1, props.value.length)}ch` }}
        />
    );

}

export default EdittableText;