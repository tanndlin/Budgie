import React from 'react';
import { sendRequest } from '../common/Requests';
import Category from './Category';

function CategoryView(props) {
    const getNewName = () => {
        // This is really bad but idc
        const names = props.categories.map((c) => c.name);
        let i = 1;
        while (names.includes(`NEW CATEGORY ${i}`)) {
            i++;
        }

        return `NEW CATEGORY ${i}`;
    };

    const createNew = () => {
        const newCat = {
            name: getNewName()
        };

        console.log('Sending Request');
        sendRequest(
            'CreateCategory',
            { ...newCat, userId: props.user.userId },
            (res) => {
                console.log(res.responseText);
                const resCat = JSON.parse(res.responseText);
                console.log(resCat);
                props.setCategories([...props.categories, resCat]);
            },
            (err) => {
                console.log(err);
            }
        );
    };

    const sendEditToApi = (category) => {
        sendRequest(
            'EditCategory',
            {
                ...category,
                userId: props.user.userId
            },
            () => {
                props.setCategories(
                    props.categories.map((c) =>
                        c.id === category.id ? category : c
                    )
                );
            },
            (err) => {
                console.log(err);
            }
        );
    };

    return (
        <div className="w-full">
            <header className="grid grid-cols-3 font-bold mb-3 border-black border-b-2 p-1">
                <h1 className="text-2xl">Categories</h1>
            </header>
            <section className="flex flex-wrap justify-center items-start gap-4 p-8">
                {props.categories.map((category) => (
                    <Category
                        key={category.id}
                        category={category}
                        sendEditToApi={sendEditToApi}
                        pushNotification={props.pushNotification}
                        removeNotification={props.removeNotification}
                        bills={props.bills}
                        budgets={props.budgets}
                        extras={props.extras}
                        categories={props.categories}
                        setCategories={props.setCategories}
                        user={props.user}
                    />
                ))}
            </section>

            <footer className="border-black border-t-2 p-1 mt-3 flex flex-row justify-between gap-4">
                <input
                    className="px-2 bg-[#189DFD] text-[#EFEDFE] hover:bg-[#3818FD] rounded-md"
                    type="button"
                    value="Add Category"
                    onClick={createNew}
                />
            </footer>
        </div>
    );
}

export default CategoryView;
