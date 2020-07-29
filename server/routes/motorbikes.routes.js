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

    Moto.findById(req.user.userMotorbike)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/friendmoto', (req, res, next) => {

    const friendMoto = req.body

    Moto.findById(req.body.userMotorbike)
        .then(response => res.json(response))
        .catch(err => next(err))
})

module.exports = router
