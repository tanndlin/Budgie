import React from 'react';
import { sendRequest } from '../common/Requests';
import EdittableText from './EdittableText';
import { sumKeyOfElement } from './Overview';

function Category(props) {
    const { category } = props;

    const getReferences = () => {
        return [...props.bills, ...props.budgets, ...props.extras].reduce(
            (acc, item) => (acc += item.categoryId === category.id),
            0
        );
    };

    const getSumOfReferences = () => {
        return (
            sumKeyOfElement(props.bills, 'price', category.id) +
            sumKeyOfElement(props.budgets, 'actualPrice', category.id) +
            sumKeyOfElement(props.extras, 'price', category.id)
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

    return (
        <div className="bg-[#b2c6ec] bg-opacity-[.7] rounded-md shadow-lg relative pr-16 pl-4 py-4">
            {category.id === -1 ? (
                <h1 className="w-full border-b-2 border-black font-bold text-xl">
                    All
                </h1>
            ) : (
                <>
                    <EdittableText
                        className="border-b-2 border-black text-xl"
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
                </>
            )}

            <span className="flex flex-row mt-4 gap-4">
                <h2>Items using this Category:</h2>
                <p className="font-bold">{getReferences()}</p>
            </span>
            <span className="flex flex-row mt-1 gap-4">
                <h2>Sum of Items:</h2>
                <p className="font-bold">{`$${getSumOfReferences()}`}</p>
            </span>
        </div>
    );
}

export default Category;
