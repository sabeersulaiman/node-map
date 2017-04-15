var express = require('express')
var api = require('./Routes/User')
var bodyParser = require('body-parser');
var mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/map"); //local

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected!')
})

var app = express()

app.use(bodyParser.json())

app.use('/v1/user', api)

app.listen(3001, () => {
    console.log("Connected to PORT : 3001")
})