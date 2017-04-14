var express = require('express')
var api = require('./Routes/Users')

var app = express()
app.use('/v1', api)

app.listen(3001, () => {
    console.log("Connected to PORT : 3001")
})