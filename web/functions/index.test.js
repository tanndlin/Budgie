/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

jest.useFakeTimers();
// import libraries
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;
const sinon = require('sinon');
const request = require('supertest');
const test = require('firebase-functions-test')();
const app = require('express');

// initialize firebase in order to access its services
admin.initializeApp(functions.config().firebase);
adminInitStub = sinon.stub(admin, 'initializeApp');

// define google cloud function name
exports.webApi = functions.https.onRequest(app);

// initialize the database and collections
const db = admin.firestore();
const userCollection = 'users';
const billCollection = 'bills';
const budgetCollection = 'budgets';
const categoryCollection = 'categories';
const oneOffCollection = 'oneOffs';
const userCollectionRef = db.collection(userCollection);
const billCollectionRef = db.collection(billCollection);

const baseURL =
    'https://us-central1-cop4331-large-project-27.cloudfunctions.net/webApi';
chai.use(chaiHttp);
chai.should();

// test CreateUserProfile
describe('POST /CreateUserProfile', () => {
    const CreateUserProfileReq = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73',
        firstName: 'sabrina',
        lastName: 'lopez',
        expectedIncome: 123456
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL)
            .post('/CreateUserProfile')
            .send(CreateUserProfileReq);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('should check that the response from the request is correct', async () => {
        const res = await request(baseURL)
            .post('/CreateUserProfile')
            .send(CreateUserProfileReq);

        assert.equal(
            res.text,
            JSON.stringify({
                userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73',
                firstName: 'sabrina',
                lastName: 'lopez',
                expectedIncome: 123456
            })
        );
        assert.equal(res.error, false);
        assert.equal(res.statusCode, 201);
    });

    it('should return the newly added profile info that is in the database', async () => {
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            userCollectionRef.doc(`${CreateUserProfileReq.userId}`).id,
            CreateUserProfileReq.userId
        );
    });
});

// test EditUserProfile
describe('POST /EditUserProfile', () => {
    const EditUserProfileReq = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73',
        firstName: 'sabrina',
        lastName: 'lopez',
        expectedIncome: 1234567890
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL)
            .post('/EditUserProfile')
            .send(EditUserProfileReq);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('should check that the response from the request is correct', async () => {
        const res = await request(baseURL)
            .post('/EditUserProfile')
            .send(EditUserProfileReq);

        assert.equal(
            res.text,
            JSON.stringify({
                userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73',
                firstName: 'sabrina',
                lastName: 'lopez',
                expectedIncome: 1234567890
            })
        );
        assert.equal(res.error, false);
        assert.equal(res.statusCode, 201);
    });

    it('should return the newly added profile info that is in the database', async () => {
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            userCollectionRef.doc(`${EditUserProfileReq.userId}`).id,
            EditUserProfileReq.userId
        );
    });
});

// test GetUserProfile
describe('POST /GetUserProfile', () => {
    const userIdJSON = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73'
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL).post('/CreateUserProfile').send(userIdJSON);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('should check that the response from the request is correct', async () => {
        const res = await request(baseURL)
            .post('/GetUserProfile')
            .send(userIdJSON);

        assert.equal(res.error, false);
        assert.equal(res.statusCode, 201);
    });

    it('should return the newly added profile info that is in the database', async () => {
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            userCollectionRef.doc(`${userIdJSON.userId}`).id,
            userIdJSON.userId
        );
    });
});

// test RemoveUserProfile
describe('POST /RemoveUserProfile', () => {
    const userIdJSON = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73'
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL).post('/CreateUserProfile').send(userIdJSON);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('should check that the response from the request is correct', async () => {
        const res = await request(baseURL)
            .post('/RemoveUserProfile')
            .send(userIdJSON);

        assert.equal(res.text, 'User profile has been deleted');
        assert.equal(res.error, false);
        assert.equal(res.statusCode, 201);
    });
});

// test CreateBill
describe('POST /CreateBill', () => {
    const CreateBillReq = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73',
        name: 'Cat Vet',
        categoryId: 'fEQyVD7Uf2j27wNYqLQG',
        color: '#ffffff',
        price: 3000,
        startDate: '08-31-22',
        endDate: '07-30-23',
        recurrence: 'monthly',
        isPaid: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL).post('/CreateBill').send(CreateBillReq);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('should check that the response from the request is correct', async () => {
        const res = await request(baseURL)
            .post('/CreateBill')
            .send(CreateBillReq);

        assert.equal(res.error, false);
        assert.equal(res.statusCode, 201);
    });

    it('should return the newly added profile info that is in the database', async () => {
        const res = await request(baseURL)
            .post('/CreateBill')
            .send(CreateBillReq);

        assert.equal(
            // eslint-disable-next-line prettier/prettier
            billCollectionRef.doc(`${CreateBillReq.userId}`).id,
            CreateBillReq.userId
        );
    });
});
