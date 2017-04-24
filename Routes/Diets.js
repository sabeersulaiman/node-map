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
    dietId = req.params('Id')
})

module.exports = router