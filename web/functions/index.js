//import libraries
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');  

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

//initialize express server
const app = express();

//initialize the database and the collection 
const db = admin.firestore();
const userCollection = 'users';
const billCollection = 'bills';
const budgetCollection = 'budgets';
const categoryCollection = 'categories';

//define google cloud function name
exports.webApi = functions.https.onRequest(app);

app.use(
    cors({
        origin: "*",
    })
);

//classes for database objects

class Bill {
    constructor(name, categoryId, color, price, startDate, endDate, recurrence, isPaid) {
        this.name = name,
        this.categoryId = categoryId,
        this.color = color,
        this.price = price,
        this.startDate = startDate,
        this.endDate = endDate,
        this.recurrence = recurrence,
        this.isPaid = isPaid
    }
}

class Budget {
    constructor(name, categoryId, expectedPrice, actualPrice, startDate, recurrence, payments) {
        this.name = name,
        this.categoryId = categoryId,
        this.expectedPrice = expectedPrice,
        this.actualPrice = actualPrice,
        this.startDate = startDate,
        this.recurrence = recurrence,
        this.payments = payments
    }
}

class Category {
    constructor(name) {
        this.name = name
    }
}

class UserProfile {
    constructor(firstName, lastName, expectedIncome) {
        this.firstName = firstName,
        this.lastName = lastName,
        this.expectedIncome = expectedIncome
    }
}

class OneOffs {
    constructor(name, categoryId, color, price, date) {
        this.name = name,
        this.categoryId = categoryId,
        this.color = color,
        this.price = price,
        this.date = date
    }
}

//TO DO: check category stuff for correct syntax, test all current API, add API for one-offs

app.post('/test', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {

        const word = req.body.word;
        res.status(201).send(`${word} was successfully processed`);

    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

app.post('/CreateUser', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {

        const userId = req.body.userId;
        await db.collection(userCollection).doc(`${userId}`).set({});
        res.status(201).send(`User ${userId} was added to the database`);

    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

app.post('/CreateUserProfile', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try{

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(`${userId}`);

        //constructor for a new user profile
        const newProfile = new UserProfile(
            req.body.firstName,
            req.body.lastName,
            req.body.expectedIncome
        );

        //add the user's profile to the database
        await userRef.set(newProfile);

        res.status(201).send(`User profile creation for ${userId} to database was successful`);

    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

app.post('/EditUser', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try{

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const profileId = req.body.profileId; 

        //edit the user profile fields
        const editedProfile = new UserProfile(
            req.body.firstName,
            req.body.lastName,
            req.body.expectedIncome
        );

        //update the user profile to the database
        await userRef.update(editedProfile);

        res.status(200).send(`User profile update for ${userId} to database was successful`);

    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

//create bill
app.post('/CreateBill', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const category = req.body.category;
        var categoryId = "";

        //check if the bill already exists
        const billExist = await userRef.collection(billCollection).where('name', '==', req.body.billName).get();
        if(!billExist.empty){
            res.status(400).send("This bill already exists")
        }

        // get category that the bill has
        var categoryDoc = await userRef.collection(categoryCollection).doc(categoryId).get();

        // if this category doesn't exist
        if(!categoryDoc.exists) { 

            // make a new category
            const newCategory = new Category(category);
       
            // add it to the category table
           categoryDoc = await userRef.collection(categoryCollection).add(newCategory);
        }
        
        // add the category for the new bill
        categoryId = categoryDoc.id;


        // constructor for a new bill
        const newBill = new Bill(
            req.body.name,
            req.body.categoryId,
            req.body.color,
            req.body.price,
            req.body.startDate,
            req.body.endDate,
            req.body.recurrence,
            req.body.isPaid //need to have the array or collection created and later maintained
        );

        const newBillDoc = await userRef.collection(billCollection).doc().set(newBill);
        res.status(201).send(`{"userId": ${userId}, "newBillId": ${newBillDoc.id}}`);

    } catch (error) {
        res.status(400).send(`${error.message}`)
    }
});

//edit bill
app.post('/EditBill', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const billId = req.body.billId; 
        const category = req.body.category;
        var categoryId = "";

        // get the category
        var categoryDoc = await userRef.collection(categoryCollection).doc(categoryId).get();

        // if the category doesn't exist, add it to the database
        if(!categoryDoc.exists) { 
            const newCategory = new Category(category);
            categoryDoc = await userRef.collection(categoryCollection).add(newCategory);
        }

        categoryId = categoryDoc.id;

        const editedBill = new Bill(
            req.body.name,
            req.body.categoryId,
            req.body.color,
            req.body.price,
            req.body.startDate,
            req.body.endDate,
            req.body.recurrence,
            req.body.isPaid
        );

        await userRef.collection(billCollection).doc(`${billId}`).update(editedBill);
        res.status(200).send(`{"userId": ${userId}, "editedBillId": ${billId}}`);

    } catch (error) {
        res.status(400).send(`${error.message}`)
    }
});

//remove bill
app.post('/RemoveBill', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const billId = req.body.billId;
        const billDoc =  await userRef.collection(billCollection).doc(`${billId}`).get();

        if(billDoc.exists) {
            await userRef.collection(billCollection).doc(`${billId}`).delete();
            res.status(200).send(`{"userId": ${userId}, "billId": "NULL"}`);
        }
        else {
            res.status(400).send("Bill doesn't exist")
        }

    } catch (error) {
        res.status(400).send(`${error.message}`)
    }
});

//create budget
app.post('/CreateBudget', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const category = req.body.category;
        var categoryId = "";

        //check if the budget already exists
        const budgetExist = await userRef.collection(budgetCollection).where('category', '==', category).get();
        if(!budgetExist.empty){
            res.status(400).send("This budget already exists")
        }

        var categoryDoc = await userRef.collection(categoryCollection).doc(categoryId).get();

        if(!categoryDoc.exists) { 
            const newCategory = new Category(category);
            categoryDoc = await userRef.collection(categoryCollection).add(newCategory);
        }

        categoryId = categoryDoc.id;

        //populate the budget payments array with all the current bills that correspond with it
        const budgetRespectiveBills = await userRef.collection(billCollection).where('category', '==', category).get();

        const newBudget = new Budget(
            req.body.name,
            req.body.categoryId,
            req.body.expectedPrice,
            req.body.actualPrice,
            req.body.startDate,
            req.body.recurrence,
            req.body.payments //need to have the array or collection created and later maintained
        );

        const newBudgetDoc = await userRef.collection(budgetCollection).doc().set(newBudget);
        res.status(201).send(`{"userId": ${userId}, "newBudgetId": ${newBudgetDoc.id}, "budgetRespectiveBills": ${budgetRespectiveBills}}`);

    } catch (error) {
        res.status(400).send(`${error.message}`)
    }
});

//edit budget
app.post('/EditBudget', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const budgetId = req.body.budgetId; 
        const category = req.body.category;
        var categoryId = "";

        var categoryDoc = await userRef.collection(categoryCollection).doc(categoryId).get();

        if(!categoryDoc.exists) { 
            const newCategory = new Category(category);
            categoryDoc = await userRef.collection(categoryCollection).add(newCategory);
        }

        categoryId = categoryDoc.id;

        //populate the budget payments array with all the current bills that correspond with it
        const budgetRespectiveBills = await userRef.collection(billCollection).where('category', '==', category).get();

        const editedBudget = new Budget(
            req.body.name,
            req.body.categoryId,
            req.body.expectedPrice,
            req.body.actualPrice,
            req.body.startDate,
            req.body.recurrence,
            req.body.payments
        );

        await userRef.collection(budgetCollection).doc(`${budgetId}`).update(editedBudget);
        res.status(200).send(`{"userId": ${userId}, "editedBudgetId": ${budgetId}, "budgetRespectiveBills": ${budgetRespectiveBills}}`);

    } catch (error) {
        res.status(400).send(`${error.message}`)
    }
});

//remove budget
app.post('/RemoveBudget', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const budgetId = req.body.budgetId; 
        const budgetDoc = await userRef.collection(budgetCollection).doc(`${budgetId}`).get();

        if(budgetDoc.exists) {
            await userRef.collection(budgetCollection).doc(`${budgetId}`).delete();
            res.status(200).send(`{"userId": ${userId}, "budgetId": "NULL"}`);
        }
        else {
            res.status(400).send("Budget doesn't exist")
        }

    } catch (error) {
        res.status(400).send(`${error.message}`)
    }
});


