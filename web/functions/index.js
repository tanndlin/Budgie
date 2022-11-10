//import libraries
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

//initialize express server
const app = express();
const main = express();

//add the path to receive request and set json as bodyParser to process the body 
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

//initialize the database and the collection 
const db = admin.firestore();
const userCollection = 'users';
const billCollection = 'bills';
const budgetCollection = 'budgets';
const categoryCollection = 'categories';
const userProfileCollection = 'userprofiles';


//define google cloud function name
exports.webApi = functions.https.onRequest(app);

//classes for database objects

class Bill {
    constructor(name, amount, startDate, endDate, recurrence, category, lastPaidDate) {
        this.name = name,
        this.amount = amount,
        this.startDate = startDate,
        this.endDate = endDate,
        this.recurrence = recurrence,
        this.category = category,
        this.lastPaidDate = lastPaidDate
    }
}

class Budget {
    constructor(name, budgetAmount, amountSpent, startDate, endDate, recurrence, category, payments) {
        this.name = name,
        this.budgetAmount = budgetAmount,
        this.amountSpent = amountSpent,
        this.startDate = startDate,
        this.endDate = endDate,
        this.recurrence = recurrence,
        this.category = category,
        this.payments = payments
    }
}

class Category {
    constructor(name) {
        this.name = name
    }
}

class UserProfile {
    constructor(firstName, lastName, email, expectedIncome) {
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email,
        this.expectedIncome = expectedIncome
    }
}

app.post('/CreateUser', async (req, res) => {
    try {

        const userId = req.body.userId;
        await db.collection(userCollection).add({userId: userId});
        res.status(201).send(`User, ${userId}, was added to the database`);

    } catch (error) {
        res.status(400).send(`User addition to database was unsuccessful`);
    }
});

app.post('/CreateUserProfile', async (req, res) => {
    try{

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(userId);

        //check if the user profile already exists
        const profileExist = await userRef.collection(userProfileCollection).where('name', '==', req.body.userEmail).get();
        if(!profileExist.empty){
            res.status(400).send("This user profile already exists")
        }

        // constructor for a new user profile
        const newProfile = new UserProfile(
            req.body.firstName,
            req.body.lastName,
            req.body.userEmail,
            req.body.expectedIncome
        );

        // add it to the collection of new user profiles
        const newProfileDoc = await userRef.collection(userProfileCollection).add(newProfile);

        res.status(201).send(`User profile creation for ${userId} to database was successful, "newProfileId": ${newProfileDoc.id}}`);

    } catch (error) {
        res.status(400).send(`User profile creation to database was unsuccessful`);
    }
});

app.post('/EditUserProfile', async (req, res) => {
    try{

        // if the user profile does not exist, we cannot edit it
        const profileExist = await userRef.collection(userProfileCollection).where('name', '==', req.body.userEmail).get();
        if(profileExist.empty){
            res.status(400).send("This user profile does not exist")
        }

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(userId);
        const profileId = req.body.profileId; 

        // edit the user profile fields
        const editedProfile = new UserProfile(
            req.body.firstName,
            req.body.lastName,
            req.body.userEmail,
            req.body.expectedIncome
        );

        // add the updated user profile to the database
        await userRef.collection(userProfileCollection).doc(profileId).update(editedProfile);

        res.status(200).send(`User profile update for ${userId} to database was successful`);

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
            req.body.billName,
            req.body.billAmount,
            req.body.billStartDate,
            req.body.billEndDate,
            req.body.billRecurrence,
            categoryId,
            req.body.lastPaidDate
        );

        await userRef.collection(billCollection).doc(billId).update(editedBill);
        res.status(200).send(`{"userId": ${userId}, "editedBillId": ${billId}}`);

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
            res.status(200).send(`{"userId": ${userId}, "billId": "NULL"}`);
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
            req.body.budgetName,
            req.body.budgetAmount,
            req.body.amountSpent,
            req.body.startDate,
            req.body.endDate,
            req.body.budgetRecurrence,
            categoryId,
            budgetRespectiveBills
        );

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
            req.body.budgetName,
            req.body.budgetAmount,
            req.body.amountSpent,
            req.body.startDate,
            req.body.endDate,
            req.body.budgetRecurrence,
            categoryId,
            budgetRespectiveBills
        );

        await userRef.collection(budgetCollection).doc(budgetId).update(editedBudget);
        res.status(200).send(`{"userId": ${userId}, "editedBudgetId": ${budgetId}}`);

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

        if(budgetDoc.exists) {
            await userRef.collection(budgetCollection).doc(budgetId).delete();
            res.status(200).send(`{"userId": ${userId}, "budgetId": "NULL"}`);
        }
        else {
            res.status(400).send("Budget doesn't exist")
        }

    } catch (error) {
        res.status(400).send(`Budget removal to database was unsuccessful`)
    }
});


