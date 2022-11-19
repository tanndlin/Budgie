import React from 'react';
import Overview from '../components/Overview';
import Account from '../components/Account';
import CategoryView from '../components/CategoryView';

function AccountPage(props) {
    return (
        <main className="h-minus-header flex flex-col gap-10">
            <article className="mt-10 mx-auto p-8 flex container max-w-[960px] bg-[#BBE9E7] bg-opacity-50 rounded-md">
                <div className="w-full py-4 h-full m-auto bg-[#b2c6ec] bg-opacity-[.7] rounded-md shadow-lg">
                    <header className="grid grid-cols-3 font-bold mb-3 border-black border-b-2 p-1">
                        <h1 className="text-2xl">My Account</h1>
                    </header>
                    <section className="grid grid-cols-2">
                        <Overview {...props} />
                        <aside className="border-black border-l-2">
                            <Account {...props} />
                        </aside>
                    </section>
                </div>
            </article>

            <article className="mb-5 mx-auto p-8 flex container max-w-[960px] bg-[#BBE9E7] bg-opacity-50 rounded-md">
                <CategoryView {...props} />
            </article>
        </main>
    );
}

export default AccountPage;
