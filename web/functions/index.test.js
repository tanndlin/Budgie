/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// import libraries
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const chai = require('chai');
const assert = chai.assert;
const sinon = require('../functions/node_modules/@sinonjs/commons/lib/prototypes');
const supertest = require('../functions/node_modules/supertest');

// at the top of test/index.test.js
const test = require('firebase-functions-test')(
    {
        databaseURL:
            'https://cop4331-large-project-27-default-rtdb.firebaseio.com',
        storageBucket: 'cop4331-large-project-27.appspot.com',
        projectId: 'cop4331-large-project-27'
    },
    '../functions/cop4331-large-project-27-firebase-adminsdk-swtw7-adaa0a55f0.json'
);

// initialize firebase in order to access its services
admin.initializeApp(functions.config().firebase);

// initialize the database and collections
const db = admin.firestore();
const userCollection = 'users';
const billCollection = 'bills';
const budgetCollection = 'budgets';
const categoryCollection = 'categories';
const oneOffCollection = 'oneOffs';

const userCollectionRef = db.collection(userCollection);

let myFunctions;

before(() => {
    // require index.js and save the exports inside a namespace called myFunctions
    // this includes our cloud functions, which can now be accessed at myFunctions.webApi
    myFunctions = require('../index');
    request = supertest(myFunctions.webApi);
});

after(() => {
    // do cleanup tasks
    test.cleanup();
    // reset the database
    // admin.database().ref('messages').remove();
});

// test CreateUserProfile
request(myFunctions.webApi)
    .get('/CreateUserProfile')
    .expect(() => {
        const userId = CreateUserProfileReq.body.userId;
        const firstName = CreateUserProfileReq.body.firstName;
        const lastName = CreateUserProfileReq.body.lastName;
        const expectedIncome = CreateUserProfileReq.body.expectedIncome;

        assert.equal(userCollectionRef.doc(`${userId}`).get('userId'), userId);
        assert.equal(
            userCollectionRef.doc(`${userId}`).get('firstName'),
            firstName
        );
        assert.equal(
            userCollectionRef.doc(`${userId}`).get('lastName'),
            lastName
        );
        assert.equal(
            userCollectionRef.doc(`${userId}`).get('expectedIncome'),
            expectedIncome
        );
        done();
    })
    .expect(201)
    .end((err) => {
        if (err) {
            throw err;
        }
    });

// test GetUserProfile
request(myFunctions.webApi)
    .get('/GetUserProfile')
    .expect(() => {
        const userId = userIdJSON.body.userId;
        assert.equal(userCollectionRef.doc(`${userId}`).id, userId);
    })
    .expect(201)
    .end((err) => {
        if (err) {
            throw err;
        }
    });

// testEEditUserProfile
request(myFunctions.webApi)
    .get('/EditUserProfile')
    .expect(() => {
        const userId = EditUserProfileReq.body.userId;
        const firstName = EditUserProfileReq.body.firstName;
        const lastName = EditUserProfileReq.body.lastName;
        const expectedIncome = EditUserProfileReq.body.expectedIncome;

        assert.equal(userCollectionRef.doc(`${userId}`).get('userId'), userId);
        assert.equal(
            userCollectionRef.doc(`${userId}`).get('firstName'),
            firstName
        );
        assert.equal(
            userCollectionRef.doc(`${userId}`).get('lastName'),
            lastName
        );
        assert.equal(
            userCollectionRef.doc(`${userId}`).get('expectedIncome'),
            expectedIncome
        );
        done();
    })
    .expect(201)
    .end((err) => {
        if (err) {
            throw err;
        }
    });

// test RemoveUserProfile
request(myFunctions.webApi)
    .get('/RemoveUserProfile')
    .expect(() => {
        const userId = userIdJSON.body.userId;
        assert.equal(userCollectionRef.doc(`${userId}`).id, null);
    })
    .expect(201)
    .end((err) => {
        if (err) {
            throw err;
        }
    });

// test DeleteUser
request(myFunctions.webApi)
    .get('/DeleteUser')
    .expect(() => {
        const userId = userIdJSON.body.userId;
        assert.equal(admin.auth().getUser(`${userId}`).id, null);
    })
    .expect(201)
    .end((err) => {
        if (err) {
            throw err;
        }
    });

// test CreateBill
/* request(myFunctions.webApi)
    .get('/CreateBill')
    .expect(() => {
        const userId = CreateBillReq.body.userId;

        assert.equal(userCollectionRef.doc(`${userId}`).get('userId'), userId);
        done();
    })
    .expect(201)
    .end((err) => {
        if (err) {
            throw err;
        }
    });*/
