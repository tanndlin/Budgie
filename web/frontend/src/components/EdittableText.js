import React from 'react';

function EdittableText(props) {
    function onBlur(e) {
        if (!e.target.value) {
            e.target.value =
                props.type === 'number' ? 0 : 'Please Enter A Value';
        }

        props.onBlur(e);
    }

    return (
        <input
            onChange={props.onChange}
            onBlur={onBlur}
            className="font-bold editable"
            type={props.type}
            value={props.value}
            style={{ width: `${Math.max(1, props.value.length)}ch` }}
        />
    );
}

export default EdittableText;
