import React from 'react';
import Dropdown from 'react-dropdown';
import EdittableText from './EdittableText';
import { sendRequest } from '../common/Requests';

function Extra(props) {
    function editMe() {
        const extra = props.extra;

        sendRequest(
            'EditOneOff',
            { ...extra, userId: props.user.userId },
            () => {
                props.setExtras(
                    props.extras.map((e) => (e.id === extra.id ? extra : e))
                );
            },
            (err) => {
                console.log(err);
            }
        );
    }

    return (
        <div className="bg-[#b2c6ec] bg-opacity-[.7] rounded-md p-4 flex flex-col relative min-w-[200px] w-min">
            <span className="flex flex-row justify-between">
                <EdittableText
                    id={`${props.extra.id}-name`}
                    type="text"
                    value={props.extra.name}
                    onChange={(e) => {
                        props.extra.name = e.target.value;
                        props.setExtras([...props.extras]);
                    }}
                    onBlur={editMe}
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
                    id={`${props.extra.id}-price`}
                    type="number"
                    value={props.extra.price}
                    onChange={(e) => {
                        props.extra.price = e.target.value;
                        props.setExtras([...props.extras]);
                    }}
                    onBlur={editMe}
                />
            </span>

            <Dropdown
                options={props.categories.map((category) => category.name)}
                value={
                    props.categories.find(
                        (c) => c.id === props.extra.categoryId
                    )?.name
                }
                onChange={(e) => {
                    props.extra.categoryId = props.categories.find(
                        (c) => c.name === e.value
                    )?.id;
                    props.setExtras([...props.extras]);
                    editMe();
                }}
                className="slim"
                controlClassName="slim"
                placeholderClassName="slim"
            />
        </div>
    );
}

export default Extra;
