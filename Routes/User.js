var express = require('express')
var router = express.Router()
var User = require('../Models/User')

router.use('/', (req, res, next) => {
    console.log("Hello")
    next()
})

router.get('/', (req, res, next) => {
    var email = req.query.email
    User.findOne({email : email}, (err, result) => {
        if(err) res.json(false)
        else res.json(result)
    })
})

router.post('/', (req, res, next) => {
    var user = new User(req.body)

    var email = req.body.email
    var name = req.body.name

    var found = false

    User.findOne({email : email}, (err, result) => {
        if(result === null) found = false
        else {
            res.json(result).end()
            found = true
        }
    })

    if(!found) {
        user.email = email
        user.name = name

        user.save((err) => {
            if(err) res.json(false)
            else{
                User.findOne({email : email}, (err, result) => {
                    if(result === null) found = true
                    else {
                        res.json(result).end()
                    }
                })
            }
        })
    }
})

module.exports = router;