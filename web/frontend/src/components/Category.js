import React from 'react';
import { sendRequest } from '../common/Requests';
import EdittableText from './EdittableText';

function Category(props) {
    const { category } = props;

    const getReferences = () => {
        return [...props.bills, ...props.budgets, ...props.extras].reduce(
            (acc, item) => (acc += item.categoryId === category.id),
            0
        );
    };

    const deleteMe = (category) => {
        const numRefs = getReferences(category);

        if (numRefs > 0) {
            const id = props.pushNotification(
                'Category in use',
                'Please remove all items from this category before deleting'
            );

            setTimeout(() => {
                props.removeNotification(id);
            }, 5000);

            return;
        }

        sendRequest(
            'RemoveCategory',
            { userId: props.user.userId, id: category.id },
            () => {
                props.setCategories(
                    props.categories.filter((c) => c.id !== category.id)
                );
            },
            (err) => {
                console.log(err);
            }
        );
    };

    if (category.id === -1) {
        return (
            <div className="bg-[#b2c6ec] bg-opacity-[.7] rounded-md shadow-lg relative pr-16 pl-4 py-4">
                <h1 className="w-full border-b-2 border-black font-bold">
                    All
                </h1>

                <h2 className="mt-4">Items using this Category</h2>
                <p>{getReferences()}</p>
            </div>
        );
    }

    return (
        <div className="bg-[#b2c6ec] bg-opacity-[.7] rounded-md shadow-lg relative pr-16 pl-4 py-4">
            <EdittableText
                className="border-b-2 border-black"
                id={category.id}
                type="text"
                value={category.name}
                onChange={(e) => {
                    category.name = e.target.value;
                    props.setCategories([...props.categories]);
                }}
                onBlur={() => {
                    props.sendEditToApi(category);
                }}
            />
            <input
                className="absolute -top-2 right-2 cursor-pointer text-[24px] font-bold hover:text-red-500"
                type="button"
                value="&times;"
                onClick={() => deleteMe(category)}
            />

            <h2 className="mt-4">Items using this Category</h2>
            <p>{getReferences()}</p>
        </div>
    );
}

export default Category;
