var express = require('express')
var api = require('./Routes/Users')

var app = express()
app.use('/v1', api)

app.listen(3000, () => {
    console.log("Connected to PORT : 3000")
})