//import libraries
<<<<<<< HEAD
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
=======
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
>>>>>>> a2612daa31d6922012b3c769eb516c580cf83b43

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
<<<<<<< HEAD
exports.webApi = functions.https.onRequest(main);
=======
export const webApi = functions.https.onRequest(main);
>>>>>>> a2612daa31d6922012b3c769eb516c580cf83b43

class User {
    constructor(userID, bills, budgets, categories) {
        this.userID = String,
<<<<<<< HEAD
        this.bills = [],
        this.budgets = [],
        this.categories = [];
=======
            this.bills = [],
            this.budgets = [],
            this.categories = [];
>>>>>>> a2612daa31d6922012b3c769eb516c580cf83b43
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
