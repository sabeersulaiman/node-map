var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose')


var user = require('./Routes/User')
var events = require('./Routes/Events')

mongoose.connect("mongodb://localhost:27017/deit"); //local

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected!')
})

var app = express()


function defaultContentTypeMiddleware (req, res, next) {
  req.headers['content-type'] = 'application/json';
  next();
}

app.use('/', defaultContentTypeMiddleware)

app.use(bodyParser.json())

app.use('/v1/user', user)
app.use('/v1/events', events)

app.listen(3001, () => {
    console.log("Connected to PORT : 3001")
})