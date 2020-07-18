const express = require('express')
const router = express.Router()

const Event = require('../models/Event.model')
// const User = require('../models/User.model')
// const Moto = require('../models/Moto.model')
const { response } = require('express')

// Endpoints
router.get('/eventList', (req, res, next) => {

    Event.find()
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/eventDetails/:event_id', (req, res, next) => {

    Event.findById(req.params.event_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/newEvent', (req, res, next) => {

    Event.create(req.body)
        .then(response => res.json(response))
        .catch(err => next(err))
})

// router.get('/myEvents', (req, res, next) => {

//     User                                                     //De momento no tengo usuarios
//         .findById(req.user._id)
//         .populate('events')
//         .then(user => {
//             let array = user.events
//             res.json(response, { array, user: req.user })
//         })
//         .catch(err => next(err))
// })

// router.post('/myEvents/add/:event_id', (req, res, next) => {

//     const userPromise = User.findOne(req.user._id)          //De momento no tengo usuarios
//     const eventPromise = Event.findById(req.params.id)

//     Promise
//         .all([userPromise, eventPromise])
//         .then((result) => {
//             if (!result[0].events.some(elm => elm == result[1].id)) {
//                 result[0].events.push(result[1])
//                 result[0].save()
//             }
//             res.json(response)      // Cómo gestiono esta respuesta? 
//         })
//         .catch(err => next(err))
// })

module.exports = router
