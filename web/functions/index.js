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
            "categoryId": `${categoryId}`,
            "color": `${req.body.color}`,
            "price": `${price}`,
            "startDate": `${req.body.startDate}`,
            "endDate": `${req.body.endDate}`,
            "recurrence": `${req.body.recurrence}`,
            "isPaid": `${isPaid}`
        }

        const billDoc = await userRef.collection(billCollection).doc().set(newBill);
        const billId = billDoc.id;
        await userRef.collection(billCollection).doc(`${billId}`).update(`"billId": "${billId}"`);
        res.status(201).send(`{
            "userId": "${userId}",
            "billId": "${billId}",
            "name": "${req.body.name}",
            "categoryId": "${categoryId}",
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

         //check if the one-off already exists
         const billDocs = await userRef.collection(billCollection).get();
         if(!billDocs.empty) {

            var bills = [];
            billDocs.docs.forEach(curBill => {
                var bill = {
                    "name":`${curBill.get("name")}`,
                    "categoryId":`${curBill.get("categoryId")}`,
                    "color":`${curBill.get("color")}`,
                    "price":`${curBill.get("price")}`,
                    "startDate":`${curBill.get("startDate")}`,
                    "endDate":`${curBill.get("endDate")}`,
                    "recurrence":`${curBill.get("recurrence")}`,
                    "isPaid":`${curBill.get("isPaid")}`,
                    "billId":`${curBill.id}`
                }

                bills.push(bill);
            })

            res.status(200).send(`{
                "userId": "${userId}",
                "oneOffs": "${JSON.stringify(bills, null, 10)}"
            }`);
        }
         else {
            res.status(400).send("There are no existing bills");
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
            "categoryId": `${categoryId}`,
            "color": `${req.body.color}`,
            "price": `${price}`,
            "startDate": `${req.body.startDate}`,
            "endDate": `${req.body.endDate}`,
            "recurrence": `${req.body.recurrence}`,
            "isPaid": `${isPaid}`,
            "billId": `${billId}`
        }

        await userRef.collection(billCollection).doc(`${billId}`).update(editedBill);
        res.status(200).send(`{
            "userId": "${userId}",
            "billId": "${billId}",
            "name": "${req.body.name}",
            "categoryId": "${categoryId}",
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

        //populate the budget payments arrays with all the current bills and one-offs that correspond with it
        const budgetRespectiveBills = await userRef.collection(billCollection).where('categoryId', '==', `${categoryId}`).get();
        const budgetRespectiveOneOffs = await userRef.collection(oneOffCollection).where('categoryId', '==', `${categoryId}`).get();

        //need to parse budgetRespectiveBills into array of the bills
        var billPrices = budgetRespectiveBills.docs.map(bill => {return bill.get(price);});
        var billSum = 0;

        //get the sum of all the bill prices
        for(var i = 0; i < budgetRespectiveBills.length; i++) {
            billSum += billPrices[i];
        }

        //need to parse budgetRespectiveOneOffs into array of the one-offs
        var oneOffPrices = budgetRespectiveOneOffs.docs.map(oneOff => {return oneOff.get(price)});
        var oneOffSum = 0;

        //get the sum of all the one-off prices
        for(var i = 0; i < budgetRespectiveOneOffs.length; i++) {
            oneOffSum += oneOffPrices[i];
        }

        //get the actualPrice based on price for the bills and one-offs of a particular category
        //Number is just a place holder and will be removed once we figure out code to get the price summation
        const actualPrice = billSum + oneOffSum;

        const newBudget = {
            "name": `${req.body.name}`,
            "categoryId": `${categoryId}`,
            "expectedPrice": `${expectedPrice}`,
            "actualPrice": `${actualPrice}`,
            "startDate": `${req.body.startDate}`,
            "recurrence": `${req.body.recurrence}`,
            "billPayments": `${budgetRespectiveBills}`,
            "oneOffPayments": `${budgetRespectiveOneOffs}`
        }

        const budgetDoc = await userRef.collection(budgetCollection).doc().set(newBudget);
        const budgetId = budgetDoc.id;
        await userRef.collection(budgetCollection).doc(`${budgetId}`).update(`"budgetId": "${budgetId}"`);
        res.status(201).send(`{
            "userId": "${userId}",
            "budgetId": "${budgetId}",
            "name": "${req.body.name}",
            "categoryId": "${categoryId}",
            "expectedPrice": ${expectedPrice},
            "actualPrice": ${actualPrice},
            "startDate": "${req.body.startDate}",
            "recurrence": "${req.body.recurrence}",
            "billPayments": "${budgetRespectiveBills}",
            "oneOffPayments": "${budgetRespectiveOneOffs}"
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

         //check if the one-off already exists
         const budgetDocs = await userRef.collection(budgetCollection).get();
         if(!budgetDocs.empty) {

            var budgets = [];
            budgetDocs.docs.forEach(curBudget => {
                var budget = {
                    "name":`${curBudget.get("name")}`,
                    "categoryId":`${curBudget.get("categoryId")}`,
                    "expectedPrice":`${curBudget.get("expectedPrice")}`,
                    "actualPrice":`${curBudget.get("actualPrice")}`,
                    "startDate":`${curBudget.get("startDate")}`,
                    "endDate":`${curBudget.get("endDate")}`,
                    "recurrence":`${curBudget.get("recurrence")}`,
                    "billPayments":`${curBudget.get("billPayments")}`,
                    "oneOffPayments":`${curBudget.get("oneOffPayments")}`,
                    "budgetId":`${curBudget.id}`
                }

                budgets.push(budget);
            })

            res.status(200).send(`{
                "userId": "${userId}",
                "budgets": "${JSON.stringify(budgets, null, 10)}"
            }`);
        }
         else {
            res.status(400).send("There are no existing budgets");
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

        const expectedPrice = parseInt(req.body.expectedPrice);

         //populate the budget payments arrays with all the current bills and one-offs that correspond with it
         const budgetRespectiveBills = await userRef.collection(billCollection).where('categoryId', '==', `${categoryId}`).get();
         const budgetRespectiveOneOffs = await userRef.collection(oneOffCollection).where('categoryId', '==', `${categoryId}`).get();
 
         //need to parse budgetRespectiveBills into array of the bills
         var billPrices = budgetRespectiveBills.docs.map(bill => {return bill.get(price);});
         var billSum = 0;
 
         //get the sum of all the bill prices
         for(var i = 0; i < budgetRespectiveBills.length; i++) {
             billSum += billPrices[i];
         }
 
         //need to parse budgetRespectiveOneOffs into array of the one-offs
         var oneOffPrices = budgetRespectiveOneOffs.docs.map(oneOff => {return oneOff.get(price)});
         var oneOffSum = 0;
 
         //get the sum of all the one-off prices
         for(var i = 0; i < budgetRespectiveOneOffs.length; i++) {
             oneOffSum += oneOffPrices[i];
         }
 
         //get the actualPrice based on price for the bills and one-offs of a particular category
         //Number is just a place holder and will be removed once we figure out code to get the price summation
         const actualPrice = billSum + oneOffSum;

        const editedBudget = {
            "name": `${req.body.name}`,
            "categoryId": `${categoryId}`,
            "expectedPrice": `${expectedPrice}`,
            "actualPrice": `${actualPrice}`,
            "startDate": `${req.body.startDate}`,
            "recurrence": `${req.body.recurrence}`,
            "billPayments": `${budgetRespectiveBills}`,
            "oneOffPayments": `${budgetRespectiveOneOffs}`,
            "budgetId": `${budgetId}`
        }

        await userRef.collection(budgetCollection).doc(`${budgetId}`).update(editedBudget);
        res.status(200).send(`{
            "userId": "${userId}",
            "budgetId": "${budgetId}",
            "name": "${req.body.name}",
            "categoryId": "${categoryId}",
            "expectedPrice": ${expectedPrice},
            "actualPrice": ${actualPrice},
            "startDate": "${req.body.startDate}",
            "recurrence": "${req.body.recurrence}",
            "billPayments": "${budgetRespectiveBills}",
            "oneOffPayments": "${budgetRespectiveOneOffs}"
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

        //get category of the one-off
        var categoryExist = await userRef.collection(categoryCollection).where('name', '==', `${req.body.category}`).get();
        var categoryId = "";
        var categoryDoc = "";

        //if this category collection or the specific category doesn't exist
        if(categoryExist.empty) {

            //make a new category
            const newCategory = {
                "name": `${req.body.category}`
            }
    
            //add it to the category table
            categoryDoc = await userRef.collection(categoryCollection).doc().set(newCategory);
            categoryId = categoryDoc.id;
        }
        else {
            var category = categoryExist.docs.map(category => {return category.id});
            categoryId = category[0];
        }

        //make price string into an integer
        const price = parseInt(req.body.price);

        //object for a new one-off
        const newOneOff = {
            "name": `${req.body.name}`,
            "categoryId": `${categoryId}`,
            "color": `${req.body.color}`,
            "price": `${price}`,
            "date": `${req.body.date}`
        }

        const oneOffDoc = userRef.collection(oneOffCollection).doc();
        const oneOffId = oneOffDoc.id;
        await oneOffDoc.set(newOneOff);

        const editedOneOff = {
            "name": `${req.body.name}`,
            "categoryId": `${categoryId}`,
            "color": `${req.body.color}`,
            "price": `${price}`,
            "date": `${req.body.date}`,
            "oneOffId": `${oneOffId}`
        }

        await userRef.collection(oneOffCollection).doc(`${oneOffId}`).update(editedOneOff);

        res.status(201).send(`{
            "userId": "${userId}",
            "oneOffId": "${oneOffId}",
            "name": "${req.body.name}",
            "categoryId": "${categoryId}",
            "color": "${req.body.color}",
            "price": ${price},
            "date": "${req.body.date}"
        }`);

    } catch (error) {
        res.status(400).send(`${error.message}`)
    }
});

//get one-offs
app.post('/GetOneOffs', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {

        const userId = req.body.userId; 
        const userRef = db.collection(userCollection).doc(`${userId}`); 

         //check if the one-off already exists
         const oneOffDocs = await userRef.collection(oneOffCollection).get();
         if(!oneOffDocs.empty) {

            var oneOffs = [];
            oneOffDocs.docs.forEach(curOneOff => {
                var oneOff = {
                    "name":`${curOneOff.get("name")}`,
                    "categoryId":`${curOneOff.get("categoryId")}`,
                    "color":`${curOneOff.get("color")}`,
                    "price":`${curOneOff.get("price")}`,
                    "date":`${curOneOff.get("date")}`,
                    "oneOffId":`${curOneOff.id}`,
                }

                oneOffs.push(oneOff);
            })

            res.status(200).send(`{
                "userId": "${userId}",
                "oneOffs": "${JSON.stringify(oneOffs, null, 10)}"
            }`);
        }
         else {
            res.status(400).send("There are no existing one-offs");
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

        //get name of the one-off
        var oneOffExist = await userRef.collection(oneOffCollection).doc(`${oneOffId}`).get();

        //if this one-off collection or the specific one-off doesn't exist
        if(!oneOffExist.empty) {

            //get category of the one-off
            var categoryExist = await userRef.collection(categoryCollection).where('name', '==', `${req.body.category}`).get();
            var categoryId = "";
            var categoryDoc = "";

            //if this category collection or the specific category doesn't exist
            if(categoryExist.empty) {

                //make a new category
                const newCategory = {
                    "name": `${req.body.category}`
                }
        
                //add it to the category table
                categoryDoc = await userRef.collection(categoryCollection).doc().set(newCategory);
                categoryId = categoryDoc.id;
            }
            else {
                var category = categoryExist.docs.map(category => {return category.id});
                categoryId = category[0];
            }

            //make price string into an integer
            const price = parseInt(req.body.price);

            const editedOneOff = {
                "name": `${req.body.name}`,
                "categoryId": `${categoryId}`,
                "color": `${req.body.color}`,
                "price": `${price}`,
                "date": `${req.body.date}`,
                "oneOffId": `${oneOffId}`
            }

            await userRef.collection(oneOffCollection).doc(`${oneOffId}`).update(editedOneOff);

            res.status(201).send(`{
                "userId": "${userId}",
                "oneOffId": "${oneOffId}",
                "name": "${req.body.name}",
                "categoryId": "${categoryId}",
                "color": "${req.body.color}",
                "price": ${price},
                "date": "${req.body.date}"
            }`);
        }
        else {
            res.status(400).send("This one-off doesn't exist");
        }

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
