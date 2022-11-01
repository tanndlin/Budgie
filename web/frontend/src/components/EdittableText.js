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

    return (
        <input
            onChange={onChange}
            className='font-bold editable'
            type="text"
            value={props.value}
            style={{ width: `${Math.max(1, props.value.length)}ch` }}
        />
    );

}

export default EdittableText;