var express = require('express')
var router = express.Router()
var User = require('../Models/User')

router.use('/', (req, res, next) => {
    console.log("In users....")
    next()
})

router.get('/:mobile', (req, res, next) => {
    var email = req.params.mobile
    User.findOne({mobile : mobile}, (err, result) => {
        if(err) res.json(false)
        else res.json(result)
    })
})

router.post('/', (req, res, next) => {
    console.log(req.body)

    var name = req.body.name
    var mobile = req.body.mobile
    var bmi = req.body.bmi
    var diabetes = req.body.diabetes
    var veg = req.body.veg

    var found = false

    User.findOne({mobile : mobile}, (err, result) => {
        if(result === null) found = false
        else {
            res.json(result).end()
            found = true
            
            if(!found) {
                var user = new User()
                
                user.name = name
                user.mobile = mobile
                user.bmi = bmi
                user.diabetes = diabetes
                user.veg = veg

                user.save((err) => {
                    console.log(err)
                    if(err) res.json(false)
                    else{
                        User.findOne({mobile : mobile}, (err, result) => {
                            if(result === null) found = true
                            else {
                                res.json(result).end()
                            }
                        })
                    }
                })
            }
        }
    })
})

module.exports = router;