import EdittableText from "./EdittableText";

function Extra(props) {

    return (
        <div className='bg-[#b2c6ec] bg-opacity-[.7] rounded-md p-4 flex flex-col'>
            <EdittableText
                type='text'
                value={props.extra.name}
                onChange={(e) => {
                    props.extra.name = e.target.value;
                    props.setExtras([...props.extras]);
                }}
            />
            <span className="flex flex-row">
                <h3 className='font-bold'>$</h3>
                <EdittableText
                    type='number'
                    value={props.extra.amount}
                    onChange={(e) => {
                        props.extra.amount = e.target.value;
                        props.setExtras([...props.extras]);
                    }}
                />
            </span>
        </div>
    );
}

export default Extra;