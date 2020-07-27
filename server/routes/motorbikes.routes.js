const express = require('express')
const router = express.Router()


const Moto = require('../models/Moto.model')


// Endpoints
router.get('/motorbikes', (req, res, next) => {

    Moto.find()
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/usermoto', (req, res, next) => {

    Moto.findById('5f1ea2c9ca95e15e90ca8eaa')
        .then(response => res.json(response))
        .catch(err => next(err))
})


module.exports = router
