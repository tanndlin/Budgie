import React from 'react';

function EdittableText(props) {

    function onChange(e) {
        const value = e.target.value;
        if (value > props.max) {
            e.target.value = props.max;
        }

        props.onChange(e);

        // Set the size of the input to the size of the text
        e.target.style.width = `${Math.max(1, value.length)}ch`;
    }

    function onBlur(e) {
        if (!e.max)
            return

        if (!e.target.value.length)
            e.target.value = 0;

        console.log(e.target.value);
    }

    return (
        <input
            onBlur={onBlur}
            onChange={onChange}
            className='font-bold editable'
            type="text"
            value={props.value}
        />
    );

}

export default EdittableText;