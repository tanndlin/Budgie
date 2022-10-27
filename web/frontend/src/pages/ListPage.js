import React from 'react';
import Header from '../components/Header';
import ListView from '../components/ListView';

function ListPage() {
    return (
        <div className="h-screen">
            <Header />
            <main className='bg-orange-200 min-h-minus-header'>
                <ListView />
            </main>
        </div>
    );
}

export default ListPage;