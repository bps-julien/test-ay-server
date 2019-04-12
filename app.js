const express = require('express')
const bodyParser = require('body-parser')

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
    return res.json({
        success: true
    })
})

server.listen(PORT, () => {
    console.log('Server listening on port ' + PORT)
})