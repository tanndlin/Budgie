//import libraries
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");

import { doc, setDoc } from "firebase/firestore"; 

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

class Bill {
    constructor(name, amount, startDate, endDate, recurrence, category, lastPaidDate) {
        this.name = String,
        this.amount = Number,
        this.startDate = Date,
        this.endDate = Date,
        this.recurrence = String,
        this.category = String,
        this.lastPaidDate = Date
    }
}

class Budget {
    constructor(name, budgetAmount, amountSpent, startDate, endDate, recurrence, category, payments) {
        this.name = String,
        this.budgetAmount = Number,
        this.amountSpent = Number,
        this.startDate = Date,
        this.endDate = Date,
        this.recurrence = String,
        this.category = String,
        this.payments = String
    }
}

class Category {
    constructor(name) {
        this.name = String
    }
}

class UserProfile {
    constructor(firstName, lastName, email, expectedIncome) {
        this.firstName = String,
        this.lastName = String,
        this.email = String,
        this.expectedIncome = Number
    }
}

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

app.post('/CreateUserProfile', async (req, res) => {
    try{


        res.status(201).send(`User profile creation to database was successful`);

    } catch (error) {
        res.status(400).send(`User profile creation to database was unsuccessful`);
    }
});

app.post('/EditUserProfile', async (req, res) => {
    try{


        res.status(201).send(`User profile update to database was successful`);

    } catch (error) {
        res.status(400).send(`User profile update to database was unsuccessful`);
    }
});

//create bill
app.post('/CreateBill', async (req, res) => {
    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(userId);
        const category = req.body.category;
        const categoryId = "";

        //check if the bill already exists
        const billExist = await userRef.collection(billCollection).where('name', '==', req.body.billName).get();
        if(!billExist.empty){
            res.status(400).send("This bill already exists")
        }

        const newCategory = new Category(category);

        const categoryDoc = await userRef.collection(categoryCollection).doc(categoryId).get();

        if(!categoryDoc.exists) { 
            const categoryDoc = await userRef.collection(categoryCollection).add(newCategory);
            categoryId = categoryDoc.id;
        }
        else { 
            //
        }

        const newBill = new Bill(
            req.body.billName,
            req.body.billAmount,
            req.body.billStartDate,
            req.body.billEndDate,
            req.body.billRecurrence,
            categoryId,
            req.body.lastPaidDate
        );

        const newBillDoc = await userRef.collection(billCollection).add(newBill);
        res.status(201).send(`{"userId": ${userId}, "newBillId": ${newBillDoc.id}}`);

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

        const newCategory = new Category(category);

        const categoryDoc = await userRef.collection(categoryCollection).doc(categoryId).get();

        if(!categoryDoc.exists) { 
            const categoryDoc = await userRef.collection(categoryCollection).add(newCategory);
            categoryId = categoryDoc.id;
        }
        else {
            //
        }

        const editedBill = new Bill(
            req.body.billName,
            req.body.billAmount,
            req.body.billStartDate,
            req.body.billEndDate,
            req.body.billRecurrence,
            categoryId,
            req.body.lastPaidDate
        );

        await userRef.collection(billCollection).doc(billId).update(editedBill);
        res.status(201).send(`{"userId": ${userId}, "editedBillId": ${billId}}`);

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
        const billDoc =  await userRef.collection(billCollection).doc(billId).get();

        if(billDoc.exists) {
            await userRef.collection(billCollection).doc(billId).delete();
            res.status(201).send(`{"userId": ${userId}, "billId": "NULL"}`);
        }
        else {
            res.status(400).send("Bill doesn't exist")
        }

    } catch (error) {
        res.status(400).send(`Bill removal to database was unsuccessful`)
    }
});

//create budget
app.post('/CreateBudget', async (req, res) => {
    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(userId);
        const category = req.body.category;
        const categoryId = "";

        //check if the budget already exists
        const budgetExist = await userRef.collection(budgetCollection).where('category', '==', category).get();
        if(!budgetExist.empty){
            res.status(400).send("This budget already exists")
        }

        const newCategory = new Category(category);

        if(!userRef.collection(categoryCollection).doc(category).exists()) { 
            const categoryDoc = await userRef.collection(categoryCollection).add(newCategory);
            categoryId = categoryDoc.id;
        }
        else {
            //
        }

        //populate the budget payments array with all the current bills that correspond with it
        const budgetRespectiveBills = await userRef.collection(billCollection).where('category', '==', category).get();

        //can calculate the total amount of expenses utilized under the specific category and insert as the amount spent
        const amountSpent = Number;

        const newBudget = new Budget();

        newBudget = {
            "name": req.body.budgetName,
            "budgetAmount": req.body.budgetAmount,
            "amountSpent": amountSpent,
            "startDate": req.body.startDate,
            "endDate": req.body.endDate,
            "recurrence": req.body.budgetRecurrence,
            "category": categoryId,
            "payments": budgetRespectiveBills
        }

        const newBudgetDoc = await userRef.collection(budgetCollection).add(newBudget);
        res.status(201).send(`{"userId": ${userId}, "newBudgetId": ${newBudgetDoc.id}}`);

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

        const newCategory = new Category(category);

        if(!userRef.collection(categoryCollection).where('name', '==', category).exists()) { 
            const categoryDoc = await userRef.collection(categoryCollection).add(newCategory);
            categoryId = categoryDoc.id;
        }
        else {
            //
        }

        //populate the budget payments array with all the current bills that correspond with it
        const budgetRespectiveBills = await userRef.collection(billCollection).where('category', '==', category).get();

        //can calculate the total amount of expenses utilized under the specific category and insert as the amount spent
        const amountSpent = Number;

        const editedBudget = new Budget();

        editedBudget = {
            "name": req.body.budgetName,
            "budgetAmount": req.body.budgetAmount,
            "amountSpent": amountSpent,
            "startDate": req.body.startDate,
            "endDate": req.body.endDate,
            "recurrence": req.body.budgetRecurrence,
            "category": categoryId,
            "payments": budgetRespectiveBills
        }

        await userRef.collection(budgetCollection).doc(budgetId).update(editedBudget);
        res.status(201).send(`{"userId": ${userId}, "editedBudgetId": ${budgetId}}`);

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
        const budgetDoc = await userRef.collection(budgetCollection).doc(budgetId).get();

        await userRef.collection(budgetCollection).doc(budgetId).delete();
        res.status(201).send(`{"userId": ${userId}, "budgetId": "NULL"}`);

        if(budgetDoc.exists) {
            await userRef.collection(budgetCollection).doc(budgetId).delete();
            res.status(201).send(`{"userId": ${userId}, "budgetId": "NULL"}`);
        }
        else {
            res.status(400).send("Budget doesn't exist")
        }

    } catch (error) {
        res.status(400).send(`Budget removal to database was unsuccessful`)
    }
});


