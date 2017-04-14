var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
    console.log('Get /v1/')
    res.send('Hai Hello')
})

module.exports = router;