import React from 'react';
import Overview from '../components/Overview';
import Account from '../components/Account';
import CategoryView from '../components/CategoryView';

function AccountPage(props) {
    return (
        <main className="min-h-minus-header py-10 flex flex-col gap-10">
            <article className="mx-auto p-8  h-4/5 min-h-[520px] container min-w-[770px] max-w-[1200px] bg-[#BBE9E7] bg-opacity-50 rounded-md">
                <header className="grid grid-cols-3 font-bold mb-3 border-black border-b-2 p-1">
                    <h1 className="text-2xl">My Account</h1>
                </header>
                <div className="w-full py-4 m-auto">
                    <section className="grid grid-cols-2">
                        <Overview {...props} />
                        <aside className="border-black border-l-2">
                            <Account {...props} />
                        </aside>
                    </section>
                </div>
            </article>

            <article className="mx-auto p-8 flex container min-w-[770px] max-w-[1200px] bg-[#BBE9E7] bg-opacity-50 rounded-md">
                <CategoryView {...props} />
            </article>
        </main>
    );
}

export default AccountPage;
