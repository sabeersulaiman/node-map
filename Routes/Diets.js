var express = require('express')
var router = express.Router()
var Diet = require("../Models/Diet")


/**
 * Route : v1/Diets
 */

//add to the db
router.post("/", (req, res, next) => {
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
    Diet.find({}, (err, res) => {
        if(err) {
            console.log(err)
            res.json([])
        }
        else {
            res.json(res)
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

module.exports = router