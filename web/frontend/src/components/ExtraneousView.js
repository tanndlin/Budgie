import React from 'react';
import { sendRequest } from '../common/Requests';
import Extra from './Extra';

function ExtraneousView(props) {
    function newExtraneous() {
        const extra = {
            name: 'New One Off',
            categoryId: -1,
            price: 0,
            color: '#000000',
            date: new Date()
        };

        sendRequest(
            'CreateOneOff',
            { userId: props.user.userId, ...extra },
            (res) => {
                const { oneOff } = JSON.parse(res.responseText);
                props.setOneOffs([...props.oneOffs, oneOff]);
            },
            (err) => {
                console.log(err);
            }
        );

        props.setExtras([...props.extras, extra]);
    }

    function deleteExtra(extra) {
        sendRequest(
            'RemoveOneOff',
            { userId: props.user.userId, id: extra.id },
            () => {
                props.setExtras(props.extras.filter((e) => e.id !== extra.id));
            },
            (err) => {
                console.log(err);
            }
        );
    }

    return (
        <article className="m-auto container bg-[#BBE9E7] bg-opacity-50 p-3 mb-5 rounded-md">
            <div className="flex flex-row justify-between font-bold border-black border-b-2 p-1">
                <h1 className="text-2xl">One Offs</h1>
                <span className="text-md">
                    <h2>{`Total:  $${Object.entries(props.extras).reduce(
                        (acc, [_key, extra]) => acc + +extra.price,
                        0
                    )}`}</h2>
                </span>
            </div>
            <section
                id="extraView"
                className="grid gap-4 justify-center py-4 px-2"
            >
                {props.extras
                    .filter((extra) => {
                        if (
                            props.categorySortID === -1 ||
                            extra.categoryId === -1
                        ) {
                            return true;
                        }

                        return extra.categoryId === props.categorySortID;
                    })
                    .map((extra) => (
                        <Extra
                            key={extra.id}
                            user={props.user}
                            extra={extra}
                            extras={props.extras}
                            setExtras={props.setExtras}
                            categories={props.categories}
                            deleteExtra={deleteExtra}
                        />
                    ))}
            </section>
            <footer className="border-black border-t-2 p-1 flex flex-row gap-4">
                <input
                    className="px-2 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md"
                    type="button"
                    value="Add Extra"
                    onClick={newExtraneous}
                />
                <input
                    className="px-2 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md"
                    type="button"
                    value="Remove Extras"
                    onClick={() => {
                        props.setExtras([]);
                        props.extras.forEach((p) => {
                            sendRequest(
                                'RemoveOneOff',
                                { userId: props.user.userId, id: p.id },
                                (res) => {
                                    console.log(res.responseText);
                                },
                                (err) => {
                                    console.log(err);
                                }
                            );
                        });
                    }}
                />
            </footer>
        </article>
    );
}

export default ExtraneousView;
