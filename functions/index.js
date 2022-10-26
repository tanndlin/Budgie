const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express');
const app = express();

/*
Create and deploy your first cloud functions
https://firebase.google.com/docs/functions/write-firebase-functions
*/

/*Basic hello world function
exports.helloWorld = functions.https.onRequest((_request, response) => {
   response.send("Hello from Firebase!");
});
*/

/*
Take the text parameter passed to this HTTP endpoint and insert it into 
Firestore under the path /messages/:documentId/original

exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('messages').add({original: original});
    // Send back a message that we've successfully written the message
    res.json({result: `Message with ID: ${writeResult.id} added.`});
});
*/

/*Listens for new messages added to /messages/:documentId/original and creates an
uppercase version of the message to /messages/:documentId/uppercase

exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
.onCreate((snap, context) => {
    // Grab the current value of what was written to Firestore.
    const original = snap.data().original;

    // Access the parameter `{documentId}` with `context.params`
    functions.logger.log('Uppercasing', context.params.documentId, original);
    
    const uppercase = original.toUpperCase();
    
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to Firestore.
    // Setting an 'uppercase' field in Firestore document returns a Promise.
    return snap.ref.set({uppercase}, {merge: true});
});
*/

exports.login = functions.https.onRequest((_request, response) => {
    response.send("login user");
 });

 exports.register = functions.https.onRequest((_request, response) => {
    response.send("register user");
 });



