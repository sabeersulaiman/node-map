var express = require('express')
var router = express.Router()
var Event = require('../Models/Event')


router.post('/', (req, res, next) => {
    console.log(req.body)

    var event = new Event()
    event.title = req.body.title
    event.time = req.body.time
    event.date = req.body.date
    event.des = req.body.des
    event.place_name = req.body.place_name
    event.geo = [req.body.latitude, req.body.longitude]
    event.user = req.body.user

    event.save((err) => {
        console.log(err)
        if(err) res.json(false)
        else res.json(true)
    })
})

module.exports = router;