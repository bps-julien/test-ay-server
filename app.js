const express = require('express')
const bodyParser = require('body-parser')

/* Initialize MongoDB */

const server = express()

const PORT = process.env.PORT || 8888

server.use(bodyParser.urlencoded({
    extended: true,
}))

server.use(bodyParser.json())

server.use(express.static(__dirname + '/website/'))

server.post('/api/users', (req, res) => {
    const data = req.body
    console.log(data)
    // Create a new user using properties contained in "data"
    return res.status(201).json({
        success: true
    })
})

server.get('/api/users', (req, res) => {
    // Get all users and return them to the client in JSON format
    // res.json(users)
})

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id
    // Get user using with id equal to "userId" and return to the client in JSON format using the line commented below
    // res.json(user)
})

server.patch('/api/users/:id', (req, res) => {
    const userId = req.params.id
    const data = req.body
    // Update user with user ID equal to "userId" with data contained in "data" and return the new user object
    // res.json(user)
})

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id
    // Delete user with user ID equal to "userId" with data contained in "data"
    res.sendStatus(204)
})

server.listen(PORT, () => {
    console.log('Server listening on port ' + PORT)
})