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

    console.log(event.geo)

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
            $maxDistance: 50/637
        }
    }, function(err, results, stats) {
       if(err) {
           res.json([]);
           return;
       }

       var set = results.map((event) => {
           var s = {
               latitude : event.geo[1],
               longitude : event.geo[0],
               _id : event._id,
               user : event.user,
               place_name : event.place_name,
               des : event.des,
               time : event.time,
               title : event.title
           }
           event.latitude = event.geo[1]
           event.longitude = event.geo[0]

           return s
       })

       res.json(set)
    });
})

//Unable to invoke no-args constructor for interface java.lang.CharSequence. Register an InstanceCreator with Gson for this type may fix this problem.

module.exports = router;