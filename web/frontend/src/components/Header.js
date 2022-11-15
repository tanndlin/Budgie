import { React } from 'react';
import { Link } from 'react-router-dom';
import { sendRequest } from '../common/Requests';
import logo from '../img/logo.png';

function Header(props) {
    // TODO: Implement this once API is done
    function save() {
        props.bills.forEach((bill) => {
            const isNew = !bill.id;
            if (isNew) {
                sendRequest(
                    'CreateBill',
                    bill,
                    (res) => {
                        console.log('Saved new bill', res);
                        const resBill = JSON.parse(res.responseText);
                        bill.id = resBill.id;
                    },
                    (err) => {
                        console.log('Error creating bill', err);
                    }
                );
            } else {
                sendRequest(
                    'EditBill',
                    bill,
                    (res) => {
                        console.log('Saved bill', res);
                    },
                    (err) => {
                        console.log('Error updating bill', err);
                    }
                );
            }
        });
    }

    return (
        <header className="bg-[#BBE9E7] h-16 grid grid-cols-3 sticky top-0 z-50">
            <img className="h-16" src={logo} alt="Bird Logo" />
            <h1 className="py-3 center text-center text-4xl font-bold">
                Budgie
            </h1>

            {props.showNav && (
                <span className="flex flex-cols gap-x-3 m-auto">
                    <input
                        className="font-bold hover:text-[#189DFD]"
                        type="button"
                        value="Save"
                        onClick={save}
                    />
                    <Link
                        className="font-bold hover:text-[#189DFD]"
                        to={{
                            pathname: '/'
                        }}
                    >
                        Log out
                    </Link>
                </span>
            )}
        </header>
    );
}
export default Header;
