//import libraries
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const auth = require ("firebase/auth");
const express = require("express");
const cors = require('cors');  
const { user } = require("firebase-functions/v1/auth");

//initialize firebase in order to access its services
admin.initializeApp(functions.config().firebase);

//initialize express server
const app = express();

//initialize the database and the collection 
const db = admin.firestore();
const userCollection = 'users';
const billCollection = 'bills';
const budgetCollection = 'budgets';
const categoryCollection = 'categories';
const oneOffCollection = 'oneOffs';

//define google cloud function name
exports.webApi = functions.https.onRequest(app);

//initialize CORS for app
app.use(
    cors({
        origin: "*",
    })
);

//TO DO: finish one-off functions and then test all API

//create user profile
app.post('/CreateUserProfile', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try{

        const userId = req.body.userId;
        const expectedIncome = parseInt(req.body.expectedIncome); 

        //when a new user signs up, they will be added to the userCollection
        await db.collection(userCollection).doc(`${userId}`).set({});
        const userRef = db.collection(userCollection).doc(`${userId}`);

        const newProfile = {
            "firstName": `${req.body.firstName}`,
            "lastName": `${req.body.lastName}`,
            "expectedIncome": `${expectedIncome}`,
        }

        //add the user's profile to the database
        await userRef.update(newProfile);

        res.status(201).send(`{"userId": "${userId}", "firstName": "${req.body.firstName}", "lastName": "${req.body.lastName}", "expectedIncome": ${req.body.expectedIncome}}`);

    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

//get user profile info
app.post('/GetUserProfile', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try{

        const userId = req.body.userId;
        const userRef = await db.collection('users').doc(`${userId}`).get();
        
        //if the user exists, then get the profile info for said user
        if(userRef.exists) {
            const firstName = userRef.get("firstName");
            const lastName = userRef.get("lastName");
            const expectedIncome = userRef.get("expectedIncome");
            res.status(200).send(`{"userId": "${userId}", "firstName": "${firstName}", "lastName": "${lastName}", "expectedIncome": ${expectedIncome}}`);
        }
        else {
            res.status(400).send("User doesn't exist")
        }

    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

//edit user profile
app.post('/EditUserProfile', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try{

        const userId = req.body.userId;
        const expectedIncome = parseInt(req.body.expectedIncome); 
        const userRef = await db.collection('users').doc(`${userId}`).get();
        
        //if the user exists, then edit the profile info for said user
        if(userRef.exists) {
            const newProfile = {
                "firstName": `${req.body.firstName}`,
                "lastName": `${req.body.lastName}`,
                "expectedIncome": `${expectedIncome}`,
            }

            //add the user's profile to the database
            await db.collection('users').doc(`${userId}`).update(newProfile);

            res.status(201).send(`{"userId": "${userId}", "firstName": "${req.body.firstName}", "lastName": "${req.body.lastName}", "expectedIncome": ${req.body.expectedIncome}}`);
        }
        else {
            res.status(400).send("User doesn't exist")
        }
        
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

//delete user profile
app.post('/RemoveUserProfile', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try{

        const userId = req.body.userId;
        const userRef = await db.collection('users').doc(`${userId}`).get();
        
        //if the user exists, then delete the user
        if(userRef.exists) {
            await db.collection('users').doc(`${userId}`).delete();
            res.status(200).send(`User has been deleted`);
        }
        else {
            res.status(400).send("User doesn't exist")
        }

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
        var categoryDoc = "";

        //check if the bill already exists
        const billExist = await userRef.collection(billCollection).where('name', '==', `${req.body.name}`).get();
        if(!billExist.empty){
            res.status(400).send("This bill already exists")
        }

        //get category that the bill has
        var categoryExist = await userRef.collection(categoryCollection).where('name', '==', `${req.body.category}`).get();

        //if this category doesn't exist
        if(categoryExist.empty) {

            //make a new category
            const newCategory = {
                "name": `${req.body.category}`
            }
       
            //add it to the category table
           categoryDoc = await userRef.collection(categoryCollection).doc().set(newCategory);
        }
        
        //add the category for the new bill
        const categoryId = categoryDoc.id;

        //make price string into an integer
        const price = parseInt(req.body.price);

        //initialize isPaid array to hold
        var isPaid = [req.body.recurrence];
        if(req.body.isPaidEvent != "NULL") {
            isPaid.push(req.body.isPaidEvent);
        }

        //constructor for a new bill
        const newBill = {
            "name": `${req.body.name}`,
            "category": `${categoryId}`,
            "color": `${req.body.color}`,
            "price": `${price}`,
            "startDate": `${req.body.startDate}`,
            "endDate": `${req.body.endDate}`,
            "recurrence": `${req.body.recurrence}`,
            "isPaid": `${isPaid}`
        }

        const billDoc = await userRef.collection(billCollection).doc().set(newBill);
        const billId = billDoc.id;
        res.status(201).send(`{
            "userId": "${userId}",
            "billId": "${billId}",
            "name": "${req.body.name}",
            "category": "${categoryId}",
            "color": "${req.body.color}",
            "price": ${price},
            "startDate": "${req.body.startDate}",
            "endDate": "${req.body.endDate}",
            "recurrence": "${req.body.recurrence}",
            "isPaid": "${isPaid}"
        }`);

    } catch (error) {
        res.status(400).send(`${error.message}`)
    }
});


//get bill
app.post('/GetBill', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const billId = req.body.billId; 

         //check if the bill already exists
         const billExist = await userRef.collection(billCollection).doc(`${billId}`).get();
         if(billExist.exists) {
            const name = userRef.collection(billCollection).doc(`${billId}`).get("name");
            const category = userRef.collection(billCollection).doc(`${billId}`).get("category");
            const color = userRef.collection(billCollection).doc(`${billId}`).get("color");
            const price = userRef.collection(billCollection).doc(`${billId}`).get("price");
            const startDate = userRef.collection(billCollection).doc(`${billId}`).get("startDate");
            const endDate = userRef.collection(billCollection).doc(`${billId}`).get("endDate");
            const recurrence = userRef.collection(billCollection).doc(`${billId}`).get("recurrence");
            const isPaid = userRef.collection(billCollection).doc(`${billId}`).get("isPaid");

            res.status(200).send(`{
                "userId": "${userId}",
                "billId": "${billId}",
                "name": "${name}",
                "category": "${category}",
                "color": "${color}",
                "price": ${price},
                "startDate": "${startDate}",
                "endDate": "${endDate}",
                "recurrence": "${recurrence}",
                "isPaid": "${isPaid}"
            }`);
        }
         else {
            res.status(400).send("This bill doesn't exist")
         }

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
        var categoryDoc = "";

        //check if the bill already exists
        const billExist = await userRef.collection(billCollection).doc(`${billId}`).get();
        if(!billExist.exists){
            res.status(400).send("This bill doesn't exist")
        }

        //get category that the bill has
        var categoryExist = await userRef.collection(categoryCollection).where('name', '==', `${req.body.category}`).get();

        //if this category doesn't exist
        if(categoryExist.empty) {

            //make a new category
            const newCategory = {
                "name": `${req.body.category}`
            }
       
            //add it to the category table
           categoryDoc = await userRef.collection(categoryCollection).doc().set(newCategory);
        }
        
        //edit the category for the current bill
        const categoryId = categoryDoc.id;

        const price = parseInt(req.body.price);

        //update isPaid depending on which months the bill has been paid
        if(req.body.isPaidEvent != "NULL") {
            isPaid.push(req.body.isPaidEvent);
        }

        const editedBill = {
            "name": `${req.body.name}`,
            "category": `${categoryId}`,
            "color": `${req.body.color}`,
            "price": `${price}`,
            "startDate": `${req.body.startDate}`,
            "endDate": `${req.body.endDate}`,
            "recurrence": `${req.body.recurrence}`,
            "isPaid": `${isPaid}`
        }

        await userRef.collection(billCollection).doc(`${billId}`).update(editedBill);
        res.status(200).send(`{
            "userId": "${userId}",
            "billId": "${billId}",
            "name": "${req.body.name}",
            "category": "${categoryId}",
            "color": "${req.body.color}",
            "price": ${price},
            "startDate": "${req.body.startDate}",
            "endDate": "${req.body.endDate}",
            "recurrence": "${req.body.recurrence}",
            "isPaid": "${isPaid}"
        }`);

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
            res.status(200).send(`{"userId": ${userId}, "billId":  ${billId}, "has been deleted"}`);
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
        var categoryDoc = "";

        //check if the budget already exists
        const budgetExist = await userRef.collection(budgetCollection).where('name', '==',  `${req.body.name}`).get();
        if(!budgetExist.empty){
            res.status(400).send("This budget already exists");
        }

        //get category that the budget has
        var categoryExist = await userRef.collection(categoryCollection).where('name', '==', `${req.body.category}`).get();

        //if this category doesn't exist
        if(categoryExist.empty) {

            //make a new category
            const newCategory = {
                "name": `${req.body.category}`
            }
       
            //add it to the category table
           categoryDoc = await userRef.collection(categoryCollection).doc().set(newCategory);
        }
        
        //add the category for the new budget
        const categoryId = categoryDoc.id;

        //make expectedPrice string into an integer
        const expectedPrice = parseInt(req.body.expectedPrice);

        //make actualPrice string into an integer
        const actualPrice = parseInt(req.body.actualPrice);

        //populate the budget payments array with all the current bills that correspond with it
        const budgetRespectiveBills = await userRef.collection(billCollection).where('category', '==', `${categoryId}`).get();

        //need to parse budgetRespectiveBills into array of the billIds aka separate into the individual bill docs
        var payments = budgetRespectiveBills.docs.map(x => x.data());

        const newBudget = {
            "name": `${req.body.name}`,
            "category": `${categoryId}`,
            "expectedPrice": `${expectedPrice}`,
            "actualPrice": `${actualPrice}`,
            "startDate": `${req.body.startDate}`,
            "recurrence": `${req.body.recurrence}`,
            "payments": `${payments}`
        }

        const budgetDoc = await userRef.collection(budgetCollection).doc().set(newBudget);
        const budgetId = budgetDoc.id;
        res.status(201).send(`{
            "userId": "${userId}",
            "budgetId": "${budgetId}",
            "name": "${req.body.name}",
            "category": "${categoryId}",
            "expectedPrice": ${expectedPrice},
            "actualPrice": ${actualPrice},
            "startDate": "${req.body.startDate}",
            "recurrence": "${req.body.recurrence}",
            "payments": "${payments}"
        }`);

    } catch (error) {
        res.status(400).send(`${error.message}`)
    }
});

//get budget
app.post('/GetBudget', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const budgetId = req.body.budgetId; 

         //check if the budget already exists
         const budgetExist = await userRef.collection(budgetCollection).doc(`${budgetId}`).get();
         if(budgetExist.exists) {
            const name = userRef.collection(budgetCollection).doc(`${budgetId}`).get("name");
            const category = userRef.collection(budgetCollection).doc(`${budgetId}`).get("category");
            const expectedPrice = userRef.collection(budgetCollection).doc(`${budgetId}`).get("expectedPrice");
            const actualPrice = userRef.collection(budgetCollection).doc(`${budgetId}`).get("actualPrice");
            const startDate = userRef.collection(budgetCollection).doc(`${budgetId}`).get("startDate");
            const recurrence = userRef.collection(budgetCollection).doc(`${budgetId}`).get("recurrence");
            const payments = userRef.collection(budgetCollection).doc(`${budgetId}`).get("payments");

            res.status(200).send(`{
                "userId": "${userId}",
                "budgetId": "${budgetId}",
                "name": "${name}",
                "category": "${category}",
                "expectedPrice": ${expectedPrice},
                "actualPrice": ${actualPrice},
                "startDate": "${startDate}",
                "recurrence": "${recurrence}",
                "payments": "${payments}"
            }`);
        }
         else {
            res.status(400).send("This budget doesn't exist")
         }

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
        var categoryDoc = "";

        //check if the budget already exists
        const budgetExist = await userRef.collection(budgetCollection).doc(`${budgetId}`).get();
        if(!budgetExist.exists){
            res.status(400).send("This budget doesn't exist");
        }

        //get category that the budget has
        var categoryExist = await userRef.collection(categoryCollection).where('name', '==', `${req.body.category}`).get();

        //if this category doesn't exist
        if(categoryExist.empty) {

            //make a new category
            const newCategory = {
                "name": `${req.body.category}`
            }
       
            //add it to the category table
           categoryDoc = await userRef.collection(categoryCollection).doc().set(newCategory);
        }
        
        //add the category for the new budget
        const categoryId = categoryDoc.id;

        //populate the budget payments array with all the current bills that correspond with it
        const budgetRespectiveBills = await userRef.collection(billCollection).where('category', '==', category).get();
        // payments is an array containing all the bills belonging
        // to the category of the budget
        var payments = budgetRespectiveBills.docs.map(x => x.data());

        const editedBudget = {
            "name": `${req.body.name}`,
            "category": `${categoryId}`,
            "expectedPrice": `${expectedPrice}`,
            "actualPrice": `${actualPrice}`,
            "startDate": `${req.body.startDate}`,
            "recurrence": `${req.body.recurrence}`,
            "payments": `${payments}`
        }

        await userRef.collection(budgetCollection).doc(`${budgetId}`).update(editedBudget);
        res.status(200).send(`{
            "userId": "${userId}",
            "budgetId": "${budgetId}",
            "name": "${req.body.name}",
            "category": "${categoryId}",
            "expectedPrice": ${expectedPrice},
            "actualPrice": ${actualPrice},
            "startDate": "${req.body.startDate}",
            "recurrence": "${req.body.recurrence}",
            "payments": "${payments}"
        }`);

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
            res.status(200).send(`{"userId": ${userId}, "budgetId": ${budgetId}, "has been deleted"}`);
        }
        else {
            res.status(400).send("Budget doesn't exist")
        }

    } catch (error) {
        res.status(400).send(`${error.message}`)
    }
});

//create one-off
app.post('/CreateOneOff', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(`${userId}`);
        var categoryDoc = "";

        //check if the one-off already exists
        const oneOffExist = await userRef.collection(oneOffCollection).where('name', '==',  `${req.body.name}`).get();
        if(!oneOffExist.empty){
            res.status(400).send("This one-off already exists");
        }

        //get category that the one-off has
        var categoryExist = await userRef.collection(categoryCollection).where('name', '==', `${req.body.category}`).get();

        //if this category doesn't exist
        if(categoryExist.empty) {

            //make a new category
            const newCategory = {
                "name": `${req.body.category}`
            }
       
            //add it to the category table
           categoryDoc = await userRef.collection(categoryCollection).doc().set(newCategory);
        }
        
        //add the category for the new one-off
        const categoryId = categoryDoc.id;

         //make price string into an integer
         const price = parseInt(req.body.price);

        //constructor for a new one-off
        const newOneOff = {
            "name": `${req.body.name}`,
            "category": `${categoryId}`,
            "color": `${req.body.color}`,
            "price": `${price}`,
            "date": `${req.body.date}`,
        }

        const oneOffDoc = await userRef.collection(oneOffCollection).doc().set(newOneOff);
        const oneOffId = oneOffDoc.id;
        res.status(201).send(`{
            "userId": "${userId}",
            "oneOffId": "${oneOffId}",
            "name": "${req.body.name}",
            "category": "${categoryId}",
            "color": "${req.body.color}",
            "price": ${price},
            "date": "${req.body.date}"
        }`);

    } catch (error) {
        res.status(400).send(`${error.message}`)
    }
});

//get one-off
app.post('/GetOneOff', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const oneOffId = req.body.oneOffId; 

         //check if the one-off already exists
         const oneOffExist = await userRef.collection(oneOffCollection).doc(`${oneOffId}`).get();
         if(oneOffExist.exists) {
            const name = userRef.collection(oneOffCollection).doc(`${oneOffId}`).get("name");
            const category = userRef.collection(oneOffCollection).doc(`${oneOffId}`).get("category");
            const color = userRef.collection(oneOffCollection).doc(`${oneOffId}`).get("color");
            const price = userRef.collection(oneOffCollection).doc(`${oneOffId}`).get("price");
            const date = userRef.collection(oneOffCollection).doc(`${oneOffId}`).get("date");

            res.status(200).send(`{
                "userId": "${userId}",
                "oneOffId": "${oneOffId}",
                "name": "${name}",
                "category": "${category}",
                "color": "${color}",
                "price": ${price},
                "date": "${date}"
            }`);
        }
         else {
            res.status(400).send("This budget doesn't exist")
         }

    } catch (error) {
        res.status(400).send(`${error.message}`)
    }
});

//edit one-off
app.post('/EditOneOff', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const oneOffId = req.body.oneOffId; 
        var categoryDoc = "";

        //check if the one-off already exists
        const oneOffExist = await userRef.collection(oneOffCollection).doc(`${oneOffId}`).get();
        if(!oneOffExist.exists){
            res.status(400).send("This one-off doesn't exist")
        }

        //get category that the one-off has
        var categoryExist = await userRef.collection(categoryCollection).where('name', '==', `${req.body.category}`).get();

        //if this category doesn't exist
        if(categoryExist.empty) {

            //make a new category
            const newCategory = {
                "name": `${req.body.category}`
            }
       
            //add it to the category table
           categoryDoc = await userRef.collection(categoryCollection).doc().set(newCategory);
        }
        
        //edit the category for the current one-off
        const categoryId = categoryDoc.id;

        const price = parseInt(req.body.price);

        const editedOneOff = {
            "name": `${req.body.name}`,
            "category": `${categoryId}`,
            "color": `${req.body.color}`,
            "price": `${price}`,
            "date": `${req.body.date}`,
        }

        await userRef.collection(oneOffCollection).doc(`${oneOffId}`).update(editedOneOff);
        res.status(200).send(`{
            "userId": "${userId}",
            "oneOffId": "${oneOffId}",
            "name": "${req.body.name}",
            "category": "${categoryId}",
            "color": "${req.body.color}",
            "price": ${price},
            "date": "${req.body.date}",
        }`);

    } catch (error) {
        res.status(400).send(`${error.message}`)
    }
});

//delete one-off
app.post('/RemoveOneOff', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const oneOffId = req.body.oneOffId;
        const oneOffDoc =  await userRef.collection(oneOffCollection).doc(`${oneOffId}`).get();

        if(oneOffDoc.exists) {
            await userRef.collection(oneOffCollection).doc(`${oneOffId}`).delete();
            res.status(200).send(`{"userId": ${userId}, "oneOffId": ${oneOffId}, "has been deleted"}`);
        }
        else {
            res.status(400).send("One-off doesn't exist")
        }

    } catch (error) {
        res.status(400).send(`${error.message}`)
    }
   
});


