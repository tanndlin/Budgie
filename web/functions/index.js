//import libraries
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";

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

//define google cloud function name
export const webApi = functions.https.onRequest(main);

class User {
    constructor(userID, bills, budgets, categories) {
        this.userID = String,
            this.bills = [],
            this.budgets = [],
            this.categories = [];
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

        const newDoc = await db.collection(userCollection).add(user);
        res.status(201).send(`Created a new user: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`User addition to database was unsuccessful`)
    }
});
