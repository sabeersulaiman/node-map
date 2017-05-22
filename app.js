var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose')


var user = require('./Routes/User')
var diets = require('./Routes/Diets')

mongoose.connect("mongodb://localhost:27017/deit"); //local

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected!')
})

var app = express()
app.use(express.static('src'))

app.get("/loaderio-679668c5470e08fc608f34051d56cd16", (req, res) => {
    res.sendFile(__dirname + "/src/loaderio-1e87620af21a233698ed90daf3d4e14a");
})
app.get("/loaderio-679668c5470e08fc608f34051d56cd16.html", (req, res) => {
    res.sendFile(__dirname + "/src/loaderio-1e87620af21a233698ed90daf3d4e14a");
})
app.get("/loaderio-679668c5470e08fc608f34051d56cd16.txt", (req, res) => {
    res.sendFile(__dirname + "/src/loaderio-1e87620af21a233698ed90daf3d4e14a");
})


function defaultContentTypeMiddleware (req, res, next) {
  req.headers['content-type'] = 'application/json';
  next();
}

app.use('/', defaultContentTypeMiddleware)

app.use(bodyParser.json())

app.use('/v1/user', user)
app.use('/v1/diets', diets)

app.listen(3001, () => {
    console.log("Connected to PORT : 3001")
})