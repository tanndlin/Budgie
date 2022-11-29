import React from 'react';
import EdittableText from './EdittableText';
import { sendRequest } from '../common/Requests';

function Account(props) {
    const [firstName, setFirstName] = React.useState(props.user.firstName);
    const [lastName, setLastName] = React.useState(props.user.lastName);
    const [expectedIncome, setExpectedIncome] = React.useState(
        props.user.expectedIncome
    );

    const editProfile = () => {
        const id = props.pushNotification('Updating profile', 'Please wait...');
        sendRequest(
            'EditUserProfile',
            {
                userId: props.user.userId,
                firstName,
                lastName,
                expectedIncome
            },
            () => {
                props.setUser({
                    ...props.user,
                    firstName,
                    lastName,
                    expectedIncome
                });
                props.removeNotification(id);
            },
            (err) => {
                console.log(err);
            }
        );

        return;
    };

    return (
        <div className="grid grid-flow-row gap-4 pl-6">
            <h2 className="text-2xl w-full text-center font-bold">My Info</h2>
            <span>
                <h3 className="text-2xl">First Name</h3>
                <EdittableText
                    id="firstName"
                    type="text"
                    value={firstName}
                    onBlur={editProfile}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                    className="text-xl"
                />
            </span>

            <span>
                <h2 className="text-2xl">Last Name</h2>
                <EdittableText
                    id="lastName"
                    type="text"
                    value={lastName}
                    onBlur={editProfile}
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                    className="text-xl"
                />
            </span>

            <span>
                <h2 className="text-2xl">Expected Income per month</h2>
                <span>
                    <p className="inline text-xl">
                        <b>$</b>
                    </p>
                    <EdittableText
                        id="expectedIncome"
                        type="number"
                        value={expectedIncome}
                        onBlur={editProfile}
                        onChange={(e) => {
                            setExpectedIncome(+e.target.value);
                        }}
                        className="inline text-xl"
                    />
                </span>
            </span>
        </div>
    );
}

export default Account;
