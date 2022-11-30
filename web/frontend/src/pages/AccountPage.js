import React from 'react';
import { Overview } from '../components/Overview';
import Account from '../components/Account';
import CategoryView from '../components/CategoryView';
import BackgroundImage from '../img/divider_v2.jpg';
import Settings from '../components/Settings';

function AccountPage(props) {
    if (!props.user) {
        window.location.href = '/';
    }

    const opacity = () => {
        if (props.backgroundToggle) {
            return 'bg-opacity-90';
        }
        return 'bg-opacity-50';
    };

    return (
        <main className="min-h-minus-header">
            {props.backgroundToggle && (
                <img
                    className={'fixed h-full w-full opacity-70 object-fill'}
                    src={BackgroundImage}
                    alt="Wooden Texture"
                />
            )}
            <div className="fixed h-full w-full object-fill overflow-y-auto snap-x scroll-smooth py-10 flex flex-col gap-10">
                <article
                    className={`mx-auto p-8 container min-w-[770px] max-w-[1200px] bg-[#BBE9E7] ${opacity()} rounded-md`}
                >
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
                    <Settings {...props} />
                </article>

                <article
                    className={`mx-auto mb-28 p-8 flex container min-w-[770px] max-w-[1200px] bg-[#BBE9E7] ${opacity()} rounded-md`}
                >
                    <CategoryView {...props} />
                </article>
            </div>
        </main>
    );
}

export default AccountPage;
