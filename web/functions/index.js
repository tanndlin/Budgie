//import libraries
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

//initialize express server
const app = express();
//const main = express();

//add the path to receive request and set json as bodyParser to process the body 
/*
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
*/

//initialize the database and the collection 
const db = admin.firestore();
const userCollection = 'users';
const billCollection = 'bills';
const budgetCollection = 'budgets';
const categoryCollection = 'categories';


//define google cloud function name
exports.webApi = functions.https.onRequest(app);

//classes for database objects
/*
class Bill {
    constructor(name, categoryID, price, startDate, endDate, recurrence, lastPaidDate) {
        this.name = String,
        this.categoryID = String,
        this.price = Number,
        this.startDate = Date,
        this.endDate = Date,
        this.recurrence = String,
        this.lastPaidDate = Date
    }
}

class Budget {
    constructor(name, expectedPrice, actualPrice, startDate, endDate, recurrence, payments) {
        this.name = String,
        this.expectedPrice = Number,
        this.actualPrice = Number,
        this.startDate = Date,
        this.endDate = Date,
        this.recurrence = String,
        this.payments = []
    }
}

class Category {
    constructor(name) {
        this.name = String
    }
}
*/

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.post('/CreateUser', async (req, res) => {
    try {

        const userId = req.body.userId;
        await db.collection(userCollection).add(userId);
        res.status(201).send(`User, ${userId}, was added to the database`);

    } catch (error) {
        res.status(400).send(`User addition to database was unsuccessful`);
    }
});

//get bill
app.get()

//create bill
app.post('/CreateBill', async (req, res) => {
    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(userId);
        const category = req.body.category;
        const categoryId = "";

        const Category = {
            name: category
        }

        if(!userRef.collection(categoryCollection).doc(categoryId).exists()) { 
            const categoryDoc = await db.collection(userCollection).id(userId).collection(categoryCollection).add(Category);
            categoryId = categoryDoc.id;
        }
        if(!userRef.collection(categoryCollection).doc(categoryId).exists()) { 
            const categoryDoc = await db.collection(userCollection).id(userId).collection(categoryCollection).add(Category);
            categoryId = categoryDoc.id;
        }

        const Bill = {
            name: req.body.billName,
            amount: req.body.billAmount,
            startDate: req.body.billStartDate,
            endDate: req.body.billEndDate,
            recurrence: req.body.billRecurrence,
            categoryID: categoryId,
            lastPaidDate: req.body.lastPaidDate
        }

        const newBill = await userRef.collection(billCollection).add(Bill);
        res.status(201).send(`For user, ${userId}, created a new bill with ID: ${newBill.id}`);

    } catch (error) {
        res.status(400).send(`Bill addition to database was unsuccessful`)
    }
});


//edit bill
app.post('/EditBill', async (req, res) => {
    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(userId);
        const billId = req.body.billId; 
        const category = req.body.category;
        const categoryId = "";

        const Category = {
            name: category
        }

        if(!userRef.collection(categoryCollection).doc(categoryId).exists()) { 
            const categoryDoc = await db.collection(userCollection).id(userId).collection(categoryCollection).add(Category);
            categoryId = categoryDoc.id;
        }

        const Bill = {
            name: req.body.billName,
            amount: req.body.billAmount,
            startDate: req.body.billStartDate,
            endDate: req.body.billEndDate,
            recurrence: req.body.billRecurrence,
            categoryID: categoryId,
            lastPaidDate: req.body.lastPaidDate
        }

        await userRef.collection(billCollection).doc(billId).update(Bill);
        res.status(201).send(`For user, ${userId}, updated the bill with ID: ${billId}`);

    } catch (error) {
        res.status(400).send(`Bill update to database was unsuccessful`)
    }
});

//remove bill
app.post('/RemoveBill', async (req, res) => {
    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(userId);
        const billId = req.body.billId; 

        await userRef.collection(billCollection).doc(billId).delete();
        res.status(201).send(`For user, ${userId}, removed bill with ID: ${billId}`);

    } catch (error) {
        res.status(400).send(`Bill removal to database was unsuccessful`)
    }
});

//get budget
app.get()

//create budget
app.post('/CreateBudget', async (req, res) => {
    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(userId);
        const category = req.body.category;
        const categoryId = "";

        const Category = {
            name: category
        }

        if(!userRef.collection(categoryCollection).doc(categoryId).exists()) { 
            const categoryDoc = await db.collection(userCollection).id(userId).collection(categoryCollection).add(Category);
            categoryId = categoryDoc.id;
        }

        const Budget = {
            //
        }

        const newBudget = await userRef.collection(budgetCollection).add(Budget);
        res.status(201).send(`For user, ${userId}, created a new budget with ID: ${newBudget.id}`);

    } catch (error) {
        res.status(400).send(`Budget addition to database was unsuccessful`)
    }
});


//edit budget
app.post('/EditBudget', async (req, res) => {
    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(userId);
        const budgetId = req.body.budgetId; 
        const category = req.body.category;
        const categoryId = "";

        const Category = {
            name: category
        }

        if(!userRef.collection(categoryCollection).doc(categoryId).exists()) { 
            const categoryDoc = await db.collection(userCollection).id(userId).collection(categoryCollection).add(Category);
            categoryId = categoryDoc.id;
        }

        const Budget = {
            //
        }

        await userRef.collection(budgetCollection).doc(budgetId).update(Budget);
        res.status(201).send(`For user, ${userId}, updated the budget with ID: ${budgetId}`);

    } catch (error) {
        res.status(400).send(`Budget update to database was unsuccessful`)
    }
});

//remove budget
app.post('/RemoveBudget', async (req, res) => {
    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(userId);
        const budgetId = req.body.budgetId; 

        await userRef.collection(budgetCollection).doc(budgetId).delete();
        res.status(201).send(`For user, ${userId}, removed budget with ID: ${budgetId}`);

    } catch (error) {
        res.status(400).send(`Budget removal to database was unsuccessful`)
    }
});
