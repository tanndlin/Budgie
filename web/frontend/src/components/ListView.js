import React from 'react';
import Bill from './Bill';
import CreateEvent from './CreateEvent';
import Modal from 'react-modal';
import CalendarControls from './CalendarControls';
import ModalStyles from '../common/ModalStyles';

function ListView(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [start, setStart] = React.useState(formatDate(new Date()));
    const [amount, setAmount] = React.useState(0);
    const [currentBill, setCurrentBill] = React.useState(null);

    function formatDate(date) {
        // return date.toISOString().split('T')[0];
        // return date;
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);

        setTitle('');
        setStart(formatDate(new Date()));
    }

    function createNew() {
        setTitle('');
        setStart(formatDate(new Date()));

        openModal();
    }

    function pushEvent(event) {
        props.modifyEvents(event, currentBill);
        setCurrentBill(null);
    }

    return (
        <div className="flex h-full">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={ModalStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <CreateEvent
                    events={props.bills}
                    title={title}
                    start={start}
                    amount={amount}
                    setAmount={setAmount}
                    setTitle={setTitle}
                    setStart={setStart}
                    closeModal={closeModal}
                    pushEvent={pushEvent}
                />
            </Modal>

            <div className="flex flex-col container m-auto mb-16">
                <CalendarControls createBill={createNew} bills={props.bills} />
                <article className="container p-4 m-auto min-h-500 max-h-3/4screen bg-yellow-200 p-3 rounded-md overflow-y-auto">
                    <span className='font-bold border-black border-b-2 flex flex-row justify-between'>
                        <h1 className="text-2xl">Bills</h1>
                        <h2 className='text-xl'>{
                            `$${Object.entries(props.bills)
                                .reduce((acc, [key, bill]) =>
                                    acc + Number(bill.amount), 0)}
                                 / month`
                        }</h2>
                    </span>
                    <section id="listView" className="grid gap-4 p-4">
                        {props.bills.map((bill) => (
                            <Bill
                                bill={bill}
                                bills={props.bills}
                                setBills={props.setBills}

                            />
                        ))}
                    </section>
                </article>
            </div>
        </div>
    );
}

export default ListView;