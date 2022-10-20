const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://tanndlin:tanndlin@merna.2no27bo.mongodb.net/test';
const client = new MongoClient(url);
client.connect();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post('/api/login', async (req, res) => {
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
    const { login, password } = req.body;
    const db = client.db('COP4331Cards');
    const results = await db
        .collection('Users')
        .find({ Login: login, Password: password })
        .toArray();
    let id = -1;
    let fn = '';
    let ln = '';
    if (results.length > 0) {
        id = results[0].UserId;
        fn = results[0].FirstName;
        ln = results[0].LastName;
    }

    console.log(id);

    const ret = { id: id, firstName: fn, lastName: ln, error: '' };
    res.status(200).json(ret);
});

app.post('/api/searchcards', async (req, res) => {
    // incoming: userId, search
    // outgoing: results[], error
    const error = '';
    const { userId, search } = req.body;
    const _search = search.trim();

    const db = client.db('COP4331Cards');
    const results = await db
        .collection('Cards')
        .find({ Card: { $regex: _search + '.*', $options: 'r' } })
        .toArray();

    const ret = {
        results: results.filter((c) => c.UserId === userId).map((c) => c.Card),
        error: error,
    };

    res.status(200).json(ret);
});

app.listen(process.env.PORT || 5000);
