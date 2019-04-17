const express = require('express')
const bodyParser = require('body-parser')
const logError = (client, error) => {
    console.log
    client.close();
}
const uuid = require('uuid/v4')
/* Initialize MongoDB */
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'fanbps';



const server = express()

const PORT = process.env.PORT || 8888

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
    data.id = uuid()
    console.log(data)

    // Create a new user using properties contained in "data"
    const client = new MongoClient(url);
    client.connect(function (err) {
        if (err) {
            logError(client, err);
            return res.sendStatus(404);
        };

        console.log("Connected successfully to server");
        const db = client.db(dbName);
        db.collection('users').insertOne(data, (error, result) => {
            if (error) {
                logError(client, error);
                return res.sendStatus(404);
            };

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
    const client = new MongoClient(url);
    client.connect(function (err) {
        if (err) {
            logError(client, err);
            return res.sendStatus(404);
        }
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const collection = db.collection('users');
        collection.find({}).toArray(function (error, users) {
            if (error) {
                logError(client, error);
                return res.sendStatus(404);
            };

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
    const client = new MongoClient(url);
    client.connect(function (err) {
        if (err) {
            logError(client, err);
            return res.sendStatus(404);
        }
        const db = client.db(dbName);
        const collection = db.collection('users');
        collection.findOne({ id: userId }, function (error, user) {
            if (error) {
                logError(client, error);
                return res.sendStatus(404);
            };

            console.log(user)
            client.close();
            return res.json({
                success: true,
                user
            })
        });


        // res.json(user)
    })
})

server.patch('/api/users/:id', (req, res) => {
    const userId = req.params.id
    const data = req.body
    // Update user with user ID equal to "userId" with data contained in "data" and return the new user object
    const client = new MongoClient(url);
    client.connect(function (err) {
        if (err) {
            logError(client, err);
            return res.sendStatus(404);
        }
        const db = client.db(dbName);
        const collection = db.collection('users');
        collection.updateOne({ id: userId },{$set:data},{upsert:true},(error, user) => {
            if (error) {
                logError(client, error);
                return res.sendStatus(404);
            };

            console.log(userId)
            client.close();
            return res.json({
                success: true,
                user
            })
        });

    })
    // res.json(user)
})

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id
    // Delete user with user ID equal to "userId" with data contained in "data"
    const client = new MongoClient(url);
    client.connect(function (err) {
        if (err) {
            logError(client, err);
            return res.sendStatus(404);
        }
        const db = client.db(dbName);
        const collection = db.collection('users');
        collection.deleteOne({ id: userId },(error, user) => {
            if (error) {
                logError(client, error);
                return res.sendStatus(404);
            };

            console.log(userId)
            client.close();
            return res.json({
                success: true,
                user
            })
        });

    })
})

server.listen(PORT, () => {
    console.log('Server listening on port ' + PORT)
})
