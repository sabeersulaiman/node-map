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
    event.geo = [req.body.longitude, req.body.latitude]
    event.user = req.body.user

    event.save((err) => {
        console.log(err)
        if(err) res.json(false)
        else res.json(true)
    })
})

router.get('/:userId/:offset/:limit', (req, res, next) => {
    var user = req.params.userId
    var offset = req.params.offset
    var limit = req.params.limit

    Event.find({user : user})
})

router.get('/locate', (req, res, next) => {
    var body = req.query;
    console.log(body)

    var geo = [body.lon, body.lat]

    var maxDistance = 8
    maxDistance /= 6371

    // var point = { type : "Point", coordinates : geo };
    //   Event.geoNear(point, { maxDistance : 5, spherical : true }, function(err, results, stats) {
    //      res.json(err);
    //      res.json(results)
    //   });

    // // Legacy point.geoNear(geo, { maxDistance : 5, spherical : true })
    Event.find({
        geo:{
            $near: geo,
            $maxDistance: 28/6371
        }
    }, function(err, results, stats) {
       console.log(err)
       console.log(results);
    });
})

module.exports = router;