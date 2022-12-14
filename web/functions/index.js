// import libraries
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

// initialize firebase in order to access its services
admin.initializeApp(functions.config().firebase);

// initialize express server
const app = express();

// initialize the database and the collection
const db = admin.firestore();
const userCollection = 'users';
const billCollection = 'bills';
const budgetCollection = 'budgets';
const categoryCollection = 'categories';
const oneOffCollection = 'oneOffs';

// define google cloud function name
exports.webApi = functions.https.onRequest(app);

// initialize CORS for app
app.use(
    cors({
        origin: '*'
    })
);

// create user profile
app.post('/CreateUserProfile', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;

        // when a new user signs up, they will be added to the userCollection
        await db.collection(userCollection).doc(`${userId}`).set({});
        const userRef = db.collection(userCollection).doc(`${userId}`);

        const newProfile = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            expectedIncome: req.body.expectedIncome
        };

        // add the user's profile to the database
        await userRef.update(newProfile);

        res.status(201).send(
            JSON.stringify({
                userId: userId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                expectedIncome: req.body.expectedIncome
            })
        );
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// get user profile info
app.post('/GetUserProfile', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = await db.collection('users').doc(`${userId}`).get();

        // if the user exists, then get the profile info for said user
        if (userRef.exists) {
            const firstName = userRef.get('firstName');
            const lastName = userRef.get('lastName');
            const expectedIncome = userRef.get('expectedIncome');
            res.status(201).send(
                JSON.stringify({
                    userId: userId,
                    firstName: firstName,
                    lastName: lastName,
                    expectedIncome: expectedIncome
                })
            );
        } else {
            res.status(400).send("User doesn't exist");
        }
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// edit user profile
app.post('/EditUserProfile', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = await db.collection('users').doc(`${userId}`).get();

        // if the user exists, then edit the profile info for said user
        if (userRef.exists) {
            const newProfile = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                expectedIncome: req.body.expectedIncome
            };

            // add the user's profile to the database
            await db.collection('users').doc(`${userId}`).update(newProfile);

            res.status(201).send(
                JSON.stringify({
                    userId: userId,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    expectedIncome: req.body.expectedIncome
                })
            );
        } else {
            res.status(400).send("User doesn't exist");
        }
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// delete user profile
app.post('/RemoveUserProfile', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = await db.collection('users').doc(`${userId}`).get();

        // if the user exists, then delete the user
        if (userRef.exists) {
            await db.collection('users').doc(`${userId}`).delete();
            res.status(201).send('User has been deleted');
        } else {
            res.status(400).send("User doesn't exist");
        }
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// create bill
app.post('/CreateBill', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = db.collection(userCollection).doc(`${userId}`);

        // make price string into an integer
        const price = parseInt(req.body.price);

        const isPaid = req.body.isPaid;

        const newBill = {
            name: req.body.name,
            categoryId: req.body.categoryId,
            color: req.body.color,
            price: price,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            recurrence: req.body.recurrence,
            isPaid: isPaid
        };

        const billDoc = userRef.collection(billCollection).doc();
        const id = billDoc.id;
        await billDoc.set(newBill);

        const editedBill = {
            name: req.body.name,
            categoryId: req.body.categoryId,
            color: req.body.color,
            price: price,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            recurrence: req.body.recurrence,
            isPaid: isPaid,
            id: id
        };

        await userRef
            .collection(billCollection)
            .doc(`${id}`)
            .update(editedBill);

        res.status(201).send(
            JSON.stringify({
                userId: userId,
                id: id,
                name: req.body.name,
                categoryId: req.body.categoryId,
                color: req.body.color,
                price: price,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                recurrence: req.body.recurrence,
                isPaid: isPaid
            })
        );
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// get bills
app.post('/GetBills', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = db.collection(userCollection).doc(`${userId}`);

        // check if the one-off already exists
        const billDocs = await userRef.collection(billCollection).get();

        const bills = billDocs.docs.map((curBill) => {
            const isPaid = curBill.get('isPaid');

            return {
                name: curBill.get('name'),
                categoryId: curBill.get('categoryId'),
                color: curBill.get('color'),
                price: curBill.get('price'),
                startDate: curBill.get('startDate'),
                endDate: curBill.get('endDate'),
                recurrence: curBill.get('recurrence'),
                isPaid: isPaid,
                id: curBill.id
            };
        });

        res.status(201).send(
            JSON.stringify({
                // userId: userId,
                bills: bills
            })
        );
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// edit bill
app.post('/EditBill', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const id = req.body.id;

        // check if the bill already exists
        const billExist = await userRef
            .collection(billCollection)
            .doc(`${id}`)
            .get();
        if (!billExist.exists) {
            res.status(400).send("This bill doesn't exist");
        }

        const price = parseInt(req.body.price);

        const isPaid = req.body.isPaid;

        const editedBill = {
            name: req.body.name,
            categoryId: req.body.categoryId,
            color: req.body.color,
            price: price,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            recurrence: req.body.recurrence,
            isPaid: isPaid,
            id: id
        };

        await userRef
            .collection(billCollection)
            .doc(`${id}`)
            .update(editedBill);

        res.status(201).send(
            JSON.stringify({
                userId: userId,
                id: id,
                name: req.body.name,
                categoryId: req.body.categoryId,
                color: req.body.color,
                price: price,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                recurrence: req.body.recurrence,
                isPaid: isPaid
            })
        );
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// remove bill
app.post('/RemoveBill', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const id = req.body.id;
        const billDoc = await userRef
            .collection(billCollection)
            .doc(`${id}`)
            .get();

        if (billDoc.exists) {
            await userRef.collection(billCollection).doc(`${id}`).delete();
            res.status(201).send(
                JSON.stringify({
                    userId: userId,
                    id: `${id} has been deleted`
                })
            );
        } else {
            res.status(400).send("Bill doesn't exist");
        }
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// create budget
app.post('/CreateBudget', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = db.collection(userCollection).doc(`${userId}`);

        const newBudget = {
            name: req.body.name,
            categoryId: req.body.categoryId,
            expectedPrice: +req.body.expectedPrice,
            actualPrice: +req.body.actualPrice,
            startDate: req.body.startDate
            // recurrence: req.body.recurrence
        };
        const budgetDoc = userRef.collection(budgetCollection).doc();
        await budgetDoc.set(newBudget);
        const id = budgetDoc.id;
        newBudget.id = budgetDoc.id;
        await userRef
            .collection(budgetCollection)
            .doc(`${id}`)
            .update(newBudget);
        res.status(201).send(JSON.stringify(newBudget));
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// get budgets
app.post('/GetBudgets', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = db.collection(userCollection).doc(`${userId}`);

        // check if the one-off already exists
        const budgetDocs = await userRef.collection(budgetCollection).get();

        const budgets = budgetDocs.docs.map((curBudget) => {
            return {
                name: curBudget.get('name'),
                categoryId: curBudget.get('categoryId'),
                expectedPrice: curBudget.get('expectedPrice'),
                actualPrice: curBudget.get('actualPrice'),
                startDate: curBudget.get('startDate'),
                // recurrence: curBudget.get('recurrence'),
                id: curBudget.id
            };
        });

        res.status(201).send(
            JSON.stringify({
                // userId: userId,
                budgets: budgets
            })
        );
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// edit budget
app.post('/EditBudget', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const id = req.body.id;

        // check if the budget already exists
        const budgetExist = await userRef
            .collection(budgetCollection)
            .doc(`${id}`)
            .get();
        if (!budgetExist.exists) {
            res.status(400).send("This budget doesn't exist");
        }

        const expectedPrice = parseInt(req.body.expectedPrice);
        const actualPrice = parseInt(req.body.actualPrice);

        const editedBudget = {
            name: req.body.name,
            categoryId: req.body.categoryId,
            expectedPrice: expectedPrice,
            actualPrice: actualPrice,
            startDate: req.body.startDate,
            // recurrence: req.body.recurrence,
            id: id
        };

        await userRef
            .collection(budgetCollection)
            .doc(`${id}`)
            .update(editedBudget);
        res.status(201).send(
            JSON.stringify({
                userId: id,
                id: id,
                name: req.body.name,
                categoryId: req.body.categoryId,
                expectedPrice: expectedPrice,
                actualPrice: actualPrice,
                startDate: req.body.startDate
                // recurrence: req.body.recurrence
            })
        );
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// remove budget
app.post('/RemoveBudget', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const id = req.body.id;
        const budgetDoc = await userRef
            .collection(budgetCollection)
            .doc(`${id}`)
            .get();

        if (budgetDoc.exists) {
            await userRef.collection(budgetCollection).doc(`${id}`).delete();
            res.status(201).send(
                JSON.stringify({
                    userId: userId,
                    budgetId: `${id} has been deleted`
                })
            );
        } else {
            res.status(400).send("Budget doesn't exist");
        }
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// create one-off
app.post('/CreateOneOff', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = db.collection(userCollection).doc(`${userId}`);

        // make price string into an integer
        const price = parseInt(req.body.price);

        // object for a new one-off
        const newOneOff = {
            name: req.body.name,
            categoryId: req.body.categoryId,
            color: req.body.color,
            price: price,
            date: req.body.date
        };

        const oneOffDoc = userRef.collection(oneOffCollection).doc();
        const id = oneOffDoc.id;
        await oneOffDoc.set(newOneOff);

        const editedOneOff = {
            name: req.body.name,
            categoryId: req.body.categoryId,
            color: req.body.color,
            price: price,
            date: req.body.date,
            id: `${id}`
        };

        await userRef
            .collection(oneOffCollection)
            .doc(`${id}`)
            .update(editedOneOff);

        res.status(201).send(
            JSON.stringify({
                userId: userId,
                id: id,
                name: req.body.name,
                categoryId: req.body.categoryId,
                color: req.body.color,
                price: price,
                date: req.body.date
            })
        );
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// get one-offs
app.post('/GetOneOffs', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = db.collection(userCollection).doc(`${userId}`);

        // check if the one-off already exists
        const oneOffDocs = await userRef.collection(oneOffCollection).get();

        const oneOffs = oneOffDocs.docs.map((curOneOff) => {
            return {
                name: curOneOff.get('name'),
                categoryId: curOneOff.get('categoryId'),
                color: curOneOff.get('color'),
                price: curOneOff.get('price'),
                date: curOneOff.get('date'),
                id: curOneOff.id
            };
        });

        res.status(201).send(
            JSON.stringify({
                // userId: userId,
                oneOffs: oneOffs
            })
        );
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// edit one-off
app.post('/EditOneOff', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const id = req.body.id;

        // get name of the one-off
        const oneOffExist = await userRef
            .collection(oneOffCollection)
            .doc(`${id}`)
            .get();

        // if this one-off collection or the specific one-off doesn't exist
        if (!oneOffExist.empty) {
            // make price string into an integer
            const price = parseInt(req.body.price);

            const editedOneOff = {
                name: req.body.name,
                categoryId: req.body.categoryId,
                color: req.body.color,
                price: price,
                date: req.body.date,
                id: id
            };

            await userRef
                .collection(oneOffCollection)
                .doc(`${id}`)
                .update(editedOneOff);

            res.status(201).send(
                JSON.stringify({
                    userId: userId,
                    id: id,
                    name: req.body.name,
                    categoryId: req.body.categoryId,
                    color: req.body.color,
                    price: price,
                    date: req.body.date
                })
            );
        } else {
            res.status(400).send("This one-off doesn't exist");
        }
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// delete one-off
app.post('/RemoveOneOff', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const id = req.body.id;
        const oneOffDoc = await userRef
            .collection(oneOffCollection)
            .doc(`${id}`)
            .get();

        if (oneOffDoc.exists) {
            await userRef.collection(oneOffCollection).doc(`${id}`).delete();
            res.status(201).send(
                JSON.stringify({
                    userId: userId,
                    id: `${id} has been deleted`
                })
            );
        } else {
            res.status(400).send("One-off doesn't exist");
        }
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// create category
app.post('/CreateCategory', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const nameInput = req.body.name;
        // const categoryName = nameInput.toUpperCase();

        // get category of the bill
        const categoryExist = await userRef
            .collection(categoryCollection)
            .where('name', '==', `${nameInput}`)
            .get();

        // if this category collection or the specific category doesn't exist
        if (categoryExist.empty) {
            // make a new category
            const newCategory = {
                name: nameInput
            };

            // add it to the category table
            const categoryDoc = userRef.collection(categoryCollection).doc();
            const id = categoryDoc.id;
            await categoryDoc.set(newCategory);

            const editedCategory = {
                name: nameInput,
                id: id
            };

            await categoryDoc.update(editedCategory);

            res.status(201).send(
                JSON.stringify({
                    userId: userId,
                    categoryName: nameInput,
                    id: id
                })
            );
        } else {
            res.send('This category already exists');
        }
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// edit category
app.post('/EditCategory', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const id = req.body.id;
        const nameInput = req.body.name;

        // get name of the category
        const categoryExist = await userRef
            .collection(categoryCollection)
            .doc(`${id}`)
            .get();

        // if this category does exist
        if (!categoryExist.empty) {
            // update its info in the table

            const editedCategory = {
                name: req.body.name,
                id: id
            };

            await userRef
                .collection(categoryCollection)
                .doc(`${id}`)
                .update(editedCategory);

            res.status(201).send(
                JSON.stringify({
                    userId: userId,
                    categoryName: nameInput,
                    id: id
                })
            );
        } else {
            res.status(400).send("This category doesn't exist");
        }
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// delete category
app.post('/RemoveCategory', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = db.collection(userCollection).doc(`${userId}`);
        const id = req.body.id;
        const categoryDoc = await userRef
            .collection(categoryCollection)
            .doc(`${id}`)
            .get();

        if (categoryDoc.exists) {
            await userRef.collection(categoryCollection).doc(`${id}`).delete();
            res.status(201).send(
                JSON.stringify({
                    userId: userId,
                    id: `${id} has been deleted`
                })
            );
        } else {
            res.status(400).send("Category doesn't exist");
        }
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// get categories
app.post('/GetCategories', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        const userRef = db.collection(userCollection).doc(`${userId}`);

        // check if the one-off already exists
        const categoryDocs = await userRef.collection(categoryCollection).get();

        const categories = categoryDocs.docs.map((curCategory) => {
            return {
                name: curCategory.get('name'),
                id: curCategory.id
            };
        });

        res.status(201).send(
            JSON.stringify({
                // userId: userId,
                categories: categories
            })
        );
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});

// delete user from authentication
app.post('/DeleteUser', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    try {
        const userId = req.body.userId;
        admin.auth().deleteUser(`${userId}`);

        res.status(201).send('User was deleted');
    } catch (error) {
        res.status(400).send(`${error.message}`);
    }
});
