import React from 'react';
import Extra from './Extra';


function ExtraneousView(props) {
    function newExtraneous() {
        const extra = {
            name: "New Extraneous",
            amount: 0,
        };

        props.setExtras([...props.extras, extra]);
    }


    return (
        <article className="m-auto container bg-[#BBE9E7] bg-opacity-90 p-3 mb-36 rounded-md">
            <div className="flex flex-row justify-between font-bold border-black border-b-2 p-1">
                <h1 className="text-2xl">Extraneous</h1>
                <span className='text-md'>
                    <h2>{
                        `Total:  $${Object.entries(props.extras)
                            .reduce((acc, [key, extra]) =>
                                acc + +extra.amount, 0)}`
                    }</h2>
                </span>
            </div>
            <section id="extraView" className="grid gap-4 justify-center p-16">
                {props.extras.map((extra) => (
                    <Extra
                        extra={extra}
                        extras={props.extras}
                        setExtras={props.setExtras}
                    />
                ))}
            </section>
            <footer className='border-black border-t-2 p-1 flex flex-row gap-4'>
                <input className='px-2 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md' type='button' value='Add Extra'
                    onClick={newExtraneous} />
                <input className='px-2 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md' type='button' value='Remove Extras'
                    onClick={() => props.setExtras([])} />
            </footer>
        </article>
    );

}

export default ExtraneousView;