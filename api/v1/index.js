'use strict'

const router = require('express').Router()

router.use('/tax', require('./controllers/taxController'))

module.exports = router
