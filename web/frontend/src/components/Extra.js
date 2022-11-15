import React from 'react';
import Dropdown from 'react-dropdown';
import EdittableText from './EdittableText';

function Extra(props) {
    return (
        <div className="bg-[#b2c6ec] bg-opacity-[.7] rounded-md p-4 flex flex-col relative min-w-[200px] w-min">
            <span className="flex flex-row justify-between">
                <EdittableText
                    type="text"
                    value={props.extra.name}
                    onChange={(e) => {
                        props.extra.name = e.target.value;
                        props.setExtras([...props.extras]);
                    }}
                />

                <input
                    className="cursor-pointer text-[24px] font-bold hover:text-red-500 ml-8 -mt-4"
                    type="button"
                    value="&times;"
                    onClick={() => props.deleteExtra(props.extra)}
                />
            </span>

            <span className="flex flex-row">
                <h3 className="font-bold">$</h3>
                <EdittableText
                    type="number"
                    value={props.extra.amount}
                    onChange={(e) => {
                        props.extra.amount = e.target.value;
                        props.setExtras([...props.extras]);
                    }}
                />
            </span>

            <Dropdown
                options={props.categories.map((category) => category.name)}
                value={
                    props.categories.find(
                        (c) => c.id === props.extra.categoryID
                    )?.name
                }
                onChange={(e) => {
                    props.extra.categoryID = props.categories.find(
                        (c) => c.name === e.value
                    )?.id;
                    props.setExtras([...props.extras]);
                }}
                className="slim"
                controlClassName="slim"
                placeholderClassName="slim"
            />
        </div>
    );
}

export default Extra;
