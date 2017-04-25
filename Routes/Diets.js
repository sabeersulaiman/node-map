var express = require('express')
var router = express.Router()
var Diet = require("../Models/Diet")


/**
 * Route : v1/Diets
 */

router.get("/:veg/:dia", (req,res) => {
    var veg = (req.params.veg === "true") ? true : false
    var dia = (req.params.dia === "true") ? true : false
    Diet.find({
        veg : veg,
        dia : dia
    }, (err, result) => {
        if(err) {
            console.log(err)
            res.json([])
        }
        else {
            var set = result.map((d) => {
                return {
                    plan : d.plan,
                    date : d.createdAt,
                    user : "Admin"
                }
            })
            res.json(set)
        }
    })
})

//add to the db
router.put("/", (req, res, next) => {
    var diet = new Diet(req.body)
    diet.save((err, d) => {
        if(err) {
            console.log(err)
            res.json(null)
        }
        else res.json(d)
    })
})

router.get("/:Id", (req, res, next) => {
    var dietId = req.params.Id
    Diet.findById(dietId, (err, d) => {
        if(err) {
            console.log(err)
            res.json(null)
            next()
        }
        else {
            return res.json(d)
        }
    })
})

router.get("/", (req,res) => {
    Diet.find({}, (err, result) => {
        if(err) {
            console.log(err)
            res.json([])
        }
        else {
            res.json(result)
        }
    })
})

router.delete("/:id", (req, res) => {
    var id = req.params.id
    Diet.findByIdAndRemove(id, (err, res) => {
        if(err) {
            console.log(err)
            res.json(false)
        }
        else {
            res.json(true)
        }
    })
})

router.post("/:Id", (req, res, next) => {
    var dietId = req.params.Id
    var di = req.body

    Diet.findById(dietId, (err, d) => {
        if(err) {
            console.log(err)
            res.json(false)
            next()
        }
        else {
            d.plan = di.plan
            d.monday = di.monday
            d.tuesday = di.tuesday
            d.wednesday = di.wednesday
            d.thursday = di.thursday
            d.friday = di.friday
            d.saturday = di.saturday
            d.sunday = di.sunday
            d.veg = di.veg
            d.dia = di.dia

            d.save((err, doc) => {
                console.log(err)
                if(err) res.json(false)
                else res.json(true)
            })
        }
    })
})

module.exports = router