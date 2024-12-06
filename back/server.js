const express = require('express')
const app = express()

app.listen(5000, () => {
console.log('Server Created!')
})
const messageController = (req, res) => {
    res.send("<h1>Hello Node!</h1>")}
    
    app.use('/', messageController)