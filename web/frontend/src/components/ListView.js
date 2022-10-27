import React from 'react';

function ListView(props) {
    return (
        <div className="flex h-screen">
            <article className="container m-auto min-h-500 bg-yellow-200 p-3 rounded-md">
                <h1 className="text-2xl font-bold border-black border-b-2 p-1">List</h1>
                <section id="listView" className="grid gap-16 justify-center p-16">
                    <div className="bg-white p-3 rounded-md">
                        <h2 className="text-xl font-bold">Item 1</h2>
                        <p className="text-lg">Description</p>
                    </div>
                    <div className="bg-white p-3 rounded-md">
                        <h2 className="text-xl font-bold">Item 2</h2>
                        <p className="text-lg">Description</p>
                    </div>
                    <div className="bg-white p-3 rounded-md">
                        <h2 className="text-xl font-bold">Item 3</h2>
                        <p className="text-lg">Description</p>
                    </div>
                </section>
            </article>
        </div>
    );
}

export default ListView;