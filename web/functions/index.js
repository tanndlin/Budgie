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


//define google cloud function name
exports.webApi = functions.https.onRequest(main);

// classes for database objects
class User {
    constructor(userID, bills, budgets, categories) {
        this.userID = String,
        this.bills = [],
        this.budgets = [],
        this.categories = [];
    }
}

class Bill {
    constructor(billID, name, categoryID, price, startDate, endDate, recurrence, lastPaidDate) {
        this.billID = String,
        this.name = String,
        this.categoryID = String,
        this.price = Number,
        this.startDate = Date,
        this.endDate = Date,
        this.recurrence = String,
        this.lastPaidDate = Date;
    }
}

class Budget {
    constructor(budgetID, name, expectedPrice, actualPrice, startDate, endDate, recurrence, payments) {
        this.budgetID = String,
        this.name = String,
        this.expectedPrice = Number,
        this.actualPrice = Number,
        this.startDate = Date,
        this.endDate = Date,
        this.recurrence = String,
        this.payments = [];
    }
}

class Category {
    constructor(categoryID, name) {
        this.categoryID = String,
        this.name = String;
    }
}

//create new user
app.post('/users', async (req, res) => {
    try {
        const User = {
            //userID: ,
            bills: [],
            budgets: [],
            categories: []
        }

        const newDoc = await db.collection(userCollection).add(User);
        res.status(201).send(`Created a new user: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`User addition to database was unsuccessful`)
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })

// Create bill
app.post('/bills', async (req, res) => {
    try {
        const Bill = {
            //billID: String,
            name: String,
            categoryID: String,
            price: Number,
            startDate: Date,
            endDate: Date,
            recurrence: String,
            lastPaidDate: Date
        }

        const newDoc = await db.collection(billCollection).add(Bill);
        res.status(201).send(`Created a new bill: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`Bill addition to database was unsuccessful`)
    }
});
