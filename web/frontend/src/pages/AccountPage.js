import React from 'react';
import Overview from '../components/Overview';
import Account from '../components/Account';

function AccountPage(props) {
    return (
        <main className="h-minus-header flex lg:flex-row sm:flex-col">
            <div className="m-auto p-8 flex container max-w-[960px] bg-[#BBE9E7] bg-opacity-50 rounded-md">
                <div className="w-full py-4 h-full m-auto bg-[#b2c6ec] bg-opacity-[.7] rounded-md shadow-lg">
                    <h1 className="text-center text-[#3B3548] text-6xl mb-16">
                        My Account
                    </h1>
                    <article className="grid grid-cols-2">
                        <Overview {...props} />
                        <aside className="border-black border-l-2">
                            <Account {...props} />
                        </aside>
                    </article>
                </div>
            </div>
        </main>
    );
}

export default AccountPage;
