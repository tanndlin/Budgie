/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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
admin.initializeApp(functions.config());
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

const baseURL =
    'https://us-central1-cop4331-large-project-27.cloudfunctions.net/webApi/';
chai.use(chaiHttp);
chai.should();

describe('POST /CreateUserProfile', () => {
    const CreateUserProfileReq = {
        body: {
            userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73',
            firstName: 'sabrina',
            lastName: 'lopez',
            expectedIncome: 123456
        }
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

    it('should return the newly added profile info that is in the database', async () => {
        const response = await request(baseURL)
            .post('/CreateUserProfile')
            .send(CreateUserProfileReq);

        assert.equal(response.body, {
            // eslint-disable-next-line prettier/prettier, quotes
                "userId": CreateUserProfileReq.body.userId,
            // eslint-disable-next-line prettier/prettier, quotes
                "firstName": `${CreateUserProfileReq.body.firstName}`,
            // eslint-disable-next-line prettier/prettier, quotes
                "lastName": `${CreateUserProfileReq.body.lastName}`,
            // eslint-disable-next-line prettier/prettier, quotes
                "expectedIncome": CreateUserProfileReq.body.expectedIncome
        });
        assert.equal(response.statusCode, 201);
        assert.equal(response.body.error, null);

        assert.equal(
            db
                .collection(userCollection)
                .doc(`${CreateUserProfileReq.body.userId}`).id,
            CreateUserProfileReq.body.userId
        );
        assert.equal(
            db
                .collection(userCollection)
                .doc(`${CreateUserProfileReq.body.userId}`)
                .get('firstName'),
            CreateUserProfileReq.body.firstName
        );
        assert.equal(
            db
                .collection(userCollection)
                .doc(`${CreateUserProfileReq.body.userId}`)
                .get('lastName'),
            CreateUserProfileReq.body.lastName
        );
        assert.equal(
            db
                .collection(userCollection)
                .doc(`${CreateUserProfileReq.body.userId}`)
                .get('expectedIncome'),
            CreateUserProfileReq.body.expectedIncome
        );
    });
});
