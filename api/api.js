const express = require('express')
const bodyParser = require('body-parser')
const logError = (client, error) => {
    console.log(error);
    client.close();
}
const uuidv4 = require('uuid/v4');
/* Initialize MongoDB */
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'bpstestay';


const server = express()

const PORT = process.env.PORT || 8889

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    res.header("Access-Control-Expose-Headers", "Content-Type, Content-Length")
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

server.use(bodyParser.urlencoded({
    extended: true,
}))

server.use(bodyParser.json())

server.post('/api/users', (req, res) => {
    const data = req.body
    data.id = uuidv4();
    console.log(data)
    // Create a new user using properties contained in "data"
    const client = new MongoClient(url);
    client.connect(function (err) {
        if (err) {
            logError(client, err);
            return res.sendStatus(400);
        }
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        db.collection('users').insertOne(data, (error, result) => {
            if (error) {
                logError(client, error);
                return res.sendStatus(400);
            }
            console.log(result)
            client.close();
            return res.status(201).json({
                success: true,
                result
            })
        });
    });
})

server.get('/api/users', (req, res) => {
    // Get all users and return them to the client in JSON format
   //db.collection('users').find()
    // res.json(users)
    const client = new MongoClient(url);
    client.connect(function (err) {
        if (err) {
            logError(client, err);
            return res.sendStatus(400);
        }
        const db = client.db(dbName);
        db.collection('users').find({}).toArray((error, users) => {
            if (error) {
                logError(client, error);
                return res.sendStatus(400);
            }
            console.log(users)
            client.close();
            return res.json({
                success: true,
                users
            })
        });
    })
})

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id
    // Get user using with id equal to "userId" and return to the client in JSON format using the line commented below
    // res.json(user)
    const client = new MongoClient(url);
    client.connect(function (err) {
        if (err) {
            logError(client, err);
            return res.sendStatus(400);
        }
        const db = client.db(dbName);
        db.collection('users').findOne({id : userId}, (error, user) => {
            if (error) {
                logError(client, error);
                return res.sendStatus(400);
            }
            console.log(user)
            client.close();
            return res.json({
                success: true,
                user
            })
        })
    })
})

server.patch('/api/users/:id', (req, res) => {
    const userId = req.params.id
    const data = req.body
    // Update user with user ID equal to "userId" with data contained in "data" and return the new user object
    // res.json(user)
    const client = new MongoClient(url);
    client.connect(function (err) {
        if (err) {
            logError(client, err);
            return res.sendStatus(400);
        }
        const db = client.db(dbName);
        db.collection('users').updateOne({ id: userId }, { $set: data }, { upsert: true }, (error, resultat) => {
            if (error) {
                logError(client, error);
                return res.sendStatus(400);
            }
            console.log(resultat)
            client.close();
            return res.json({
                success: true,
                resultat
            })
        });
    });
})

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id
    // Delete user with user ID equal to "userId" with data contained in "data"
    const client = new MongoClient(url);
    client.connect(function (err) {
        if (err) {
            logError(client, err);
            return res.sendStatus(400);
        }
        const db = client.db(dbName);
        db.collection('users').deleteOne({id : userId}, (error, usr) => {
            if (error) {
                logError(client, error);
                return res.sendStatus(400);
            }
            console.log(usr)
            client.close();
            return res.json({
                success: true,
                usr
            })
        })
    })
})

server.listen(PORT, () => {
    console.log('Server listening on port ' + PORT)
})