const functions = require('firebase-functions');
const firebase = require('firebase');
//const express = require('express')();

// your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7OHvwvqRgrOvgYoy2C5sgnXSZ02xLZPc",
  authDomain: "cop4331-large-project-27.firebaseapp.com",
  databaseURL: "https://cop4331-large-project-27-default-rtdb.firebaseio.com",
  projectId: "cop4331-large-project-27",
  storageBucket: "cop4331-large-project-27.appspot.com",
  messagingSenderId: "426012497735",
  appId: "1:426012497735:web:7ed50d80324be477535e62"
};

//initialize Firebase
firebase.app.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

function register() {
     
    //collect user registration input
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    //create user
    auth.createUserWithEmailAndPassword(email, password, confirmPassword)
        .then(() => {
            var user = auth.currentUser;

            var databaseRef = database.ref();

            if((validateEmail(email) == false) || validateField(email)) { res.status(500).send('Email is not valid'); }
            if((validatePassword(password) == false) || validateField(password)) { res.status(500).send('Password is not valid'); }
            if((confirmPassword(password, confirmPassword) == false) || validateField(confirmPassword)) { res.status(500).send('Passwords do not match'); }

            const newUser = {
                email: email,
                password: password,
                lastLogin: Date.now()
            };

            databaseRef.child('users/' + user.uid).set(newUser);
        })
        .catch(err => {
            var errorCode = err.code;
            var errorMessage = err.message;

            res.status(500).json({error: errorCode, message: errorMessage})
            console.error()
        })
}

exports.register = functions.https.onRequest((req, res) => {
    register();
});

function login() {
    //collect user registration input
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //create user
    auth.loginUserWithEmailAndPassword(email, password)
        .then(() => {
            var user = auth.currentUser;

            var databaseRef = database.ref();

            if((validateEmail(email) == false) || validateField(email) /*&& ()*/) { res.status(500).send('Email is not valid'); }
            if(validateField(password) /*|| ()*/) { res.status(500).send('Password is not valid'); }

            const curUser = {
                lastLogin: Date.now()
            };

            databaseRef.child('users/' + user.uid).update(curUser);
        })
        .catch(err => {
            var errorCode = err.code;
            var errorMessage = err.message;

            res.status(500).json({error: errorCode, message: errorMessage})
            console.error()
        })
}

exports.login = functions.https.onRequest((req, res) => {
    login();
});

function validateEmail(email) {
    const expression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (expression.test(email) == true) {
        
        //email is good
        return true;
      } 
      else {

        //email is not good
        return false;
      }
}

function validatePassword(password) {
    var pw = /^(?=.*\d)(?=.*[!@#$%^&*()_-+=~`,.:;])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (pw.test(password) == true) {

        //password is good
        return true;
      } 
      else {

        //password is not good
        return false;
      }
}

function confirmPassword(password, confirmPassword) {
    if (password == confirmPassword) {
        return true;
    }
    else {
        return false;
    }
}

function validateField(field) {
    if (field == null) {
        return false;
    }

    if (field.length <= 0) {
        return false;
    } 
    else {
        return true;
    }
}
