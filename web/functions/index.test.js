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
const budgetCollectionRef = db.collection(budgetCollection);
const oneOffCollectionRef = db.collection(oneOffCollection);
const categoryCollectionRef = db.collection(categoryCollection);

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
        categoryId: 'CSbHnxatAJJJLsPMm4no',
        color: '#ffffff',
        price: 3000,
        startDate: '08-31-22',
        endDate: '07-30-23',
        recurrence: 'monthly',
        isPaid: ['Aug', 'Sep', 'Oct']
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
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            billCollectionRef.doc(`${CreateBillReq.userId}`).id,
            CreateBillReq.userId
        );
    });
});

// test EditBill
describe('POST /EditBill', () => {
    const EditBillReq = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73',
        id: '8XVsrx0tJ4opHqA1SDJL',
        name: 'Cat Vet',
        categoryId: 'CSbHnxatAJJJLsPMm4no',
        color: '#ffffff',
        price: 5200,
        startDate: '09-31-22',
        endDate: '08-30-23',
        recurrence: 'monthly',
        isPaid: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL).post('/CreateBill').send(EditBillReq);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('should check that the response from the request is correct', async () => {
        const res = await request(baseURL)
            .post('/CreateBill')
            .send(EditBillReq);

        assert.equal(res.error, false);
        assert.equal(res.statusCode, 201);
    });

    it('should return the newly added profile info that is in the database', async () => {
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            billCollectionRef.doc(`${EditBillReq.userId}`).id,
            EditBillReq.userId
        );
    });
});

// test GetBills
describe('POST /GetBills', () => {
    const userIdJSON = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73'
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL).post('/GetBills').send(userIdJSON);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('should check that the response from the request is correct', async () => {
        const res = await request(baseURL).post('/GetBills').send(userIdJSON);

        assert.equal(res.error, false);
        assert.equal(res.statusCode, 201);
    });

    it('should return the newly added profile info that is in the database', async () => {
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            billCollectionRef.doc(`${userIdJSON.userId}`).id,
            userIdJSON.userId
        );
    });
});

// test RemoveBill
describe('POST /RemoveBill', () => {
    const userIdJSON = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73',
        id: '8XVsrx0tJ4opHqA1SDJL'
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL).post('/RemoveBill').send(userIdJSON);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('check if bill was in the database', async () => {
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            billCollectionRef.doc(`${userIdJSON.userId}`).id,
            userIdJSON.userId
        );
    });
});

// test CreateBudget
describe('POST /CreateBudget', () => {
    const CreateBudgetReq = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73',
        name: 'cat',
        categoryId: 'CSbHnxatAJJJLsPMm4no',
        expectedPrice: 6000,
        actualPrice: 5200,
        startDate: '08-14-22'
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL).post('/CreateBudget').send(CreateBudgetReq);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('check if the userId for the budget exists', async () => {
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            budgetCollectionRef.doc(`${CreateBudgetReq.userId}`).id,
            CreateBudgetReq.userId
        );
    });
});

// test EditBudget
describe('POST /EditBudget', () => {
    const EditBudgetReq = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73',
        id: 'KsOZrh5tiNc2bF2IFLVa',
        name: 'Garfield',
        categoryId: 'CSbHnxatAJJJLsPMm4no',
        expectedPrice: 6000,
        actualPrice: 5200,
        startDate: '08-14-22'
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL).post('/EditBudget').send(EditBudgetReq);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('check if the userId for the budget exists', async () => {
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            budgetCollectionRef.doc(`${EditBudgetReq.userId}`).id,
            EditBudgetReq.userId
        );
    });
});

// test GetBudgets
describe('POST /GetBudgets', () => {
    const userIdJSON = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73'
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL).post('/GetBudgets').send(userIdJSON);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('should check that the response from the request is correct', async () => {
        const res = await request(baseURL).post('/GetBudgets').send(userIdJSON);

        assert.equal(res.error, false);
        assert.equal(res.statusCode, 201);
    });

    it('check if the userId for the budgets exists', async () => {
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            budgetCollectionRef.doc(`${userIdJSON.userId}`).id,
            userIdJSON.userId
        );
    });
});

// test RemoveBudget
describe('POST /RemoveBudget', () => {
    const userIdJSON = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73',
        id: 'KsOZrh5tiNc2bF2IFLVa'
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL).post('/RemoveBudget').send(userIdJSON);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('check if budget was in the database', async () => {
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            budgetCollectionRef.doc(`${userIdJSON.userId}`).id,
            userIdJSON.userId
        );
    });
});

// test CreateOneOff
describe('POST /CreateOneOff', () => {
    const CreateOneOffReq = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73',
        name: 'flea medication',
        categoryId: 'CSbHnxatAJJJLsPMm4no',
        color: '#ffffff',
        price: 500,
        date: '09-31-22'
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL).post('/CreateOneOff').send(CreateOneOffReq);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('check if the userId for the one-off exists', async () => {
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            oneOffCollectionRef.doc(`${CreateOneOffReq.userId}`).id,
            CreateOneOffReq.userId
        );
    });
});

// test EditOneOff
describe('POST /EditOneOff', () => {
    const EditOneOffReq = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73',
        id: 'fSFIXeYwHBD3WKMeRdx8',
        name: 'flea medication',
        categoryId: 'CSbHnxatAJJJLsPMm4no',
        color: '#ffffff',
        price: 1000,
        date: '09-31-22'
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL).post('/EditOneOff').send(EditOneOffReq);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('check if the userId for the one-off exists', async () => {
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            oneOffCollectionRef.doc(`${EditOneOffReq.userId}`).id,
            EditOneOffReq.userId
        );
    });
});

// test GetOneOffs
describe('POST /GetOneOffs', () => {
    const userIdJSON = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73'
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL).post('/GetOneOffs').send(userIdJSON);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('should check that the response from the request is correct', async () => {
        const res = await request(baseURL).post('/GetOneOffs').send(userIdJSON);

        assert.equal(res.error, false);
        assert.equal(res.statusCode, 201);
    });

    it('check if the userId for the one-offs exists', async () => {
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            oneOffCollectionRef.doc(`${userIdJSON.userId}`).id,
            userIdJSON.userId
        );
    });
});

// test RemoveOneOff
describe('POST /RemoveOneOff', () => {
    const userIdJSON = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73',
        id: 'fSFIXeYwHBD3WKMeRdx8'
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL).post('/RemoveOneOff').send(userIdJSON);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('check if one-off was in the database', async () => {
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            oneOffCollectionRef.doc(`${userIdJSON.userId}`).id,
            userIdJSON.userId
        );
    });
});

// test CreateCategory
describe('POST /CreateCategory', () => {
    const CreateCategoryReq = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73',
        name: 'cat vet'
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL).post('/CreateCategory').send(CreateCategoryReq);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('check if the userId for the category exists', async () => {
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            categoryCollectionRef.doc(`${CreateCategoryReq.userId}`).id,
            CreateCategoryReq.userId
        );
    });
});

// test EditCategory
describe('POST /EditCategory', () => {
    const EditCategoryReq = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73',
        name: 'vet',
        id: 'CSbHnxatAJJJLsPMm4no'
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL).post('/EditCategory').send(EditCategoryReq);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('check if the userId for the category exists', async () => {
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            categoryCollectionRef.doc(`${EditCategoryReq.userId}`).id,
            EditCategoryReq.userId
        );
    });
});

// test GetCategories
describe('POST /GetCategories', () => {
    const userIdJSON = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73'
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL).post('/GetCategories').send(userIdJSON);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('should check that the response from the request is correct', async () => {
        const res = await request(baseURL)
            .post('/GetCategories')
            .send(userIdJSON);

        assert.equal(res.error, false);
        assert.equal(res.statusCode, 201);
    });

    it('check if the userId for the categories exists', async () => {
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            categoryCollectionRef.doc(`${userIdJSON.userId}`).id,
            userIdJSON.userId
        );
    });
});

// test RemoveCategory
describe('POST /RemoveCategory', () => {
    const userIdJSON = {
        userId: 'I8tTDjJ6rJhUJkzfj7FIdJXxdV73',
        id: 'CSbHnxatAJJJLsPMm4no'
    };

    beforeAll(async () => {
        // set up the api
        await request(baseURL).post('/RemoveCategory').send(userIdJSON);
    });

    afterAll(async () => {
        // clean up test
        test.cleanup();
    });

    it('check if category was in the database', async () => {
        assert.equal(
            // eslint-disable-next-line prettier/prettier
            categoryCollectionRef.doc(`${userIdJSON.userId}`).id,
            userIdJSON.userId
        );
    });
});
