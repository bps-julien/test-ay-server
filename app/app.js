const express = require('express')

const server = express()

const PORT = process.env.PORT || 8888

server.use(express.static(__dirname + '/website/'))

server.get("/test", (req,res) => {
    res.send("It worked")
})

server.listen(PORT, () => {
    console.log('Server listening on port ' + PORT)
})

