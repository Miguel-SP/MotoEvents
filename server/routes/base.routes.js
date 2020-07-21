const express = require('express')
const router = express.Router()

const Event = require('../models/Event.model')
const User = require('../models/User.model')
// const Moto = require('../models/Moto.model')
const { response } = require('express')

// Endpoints
router.get('/eventList', (req, res, next) => {

    Event.find()
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/eventDetails/:id', (req, res, next) => {

    Event.findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/newEvent', (req, res, next) => {

    Event.create(req.body)
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.post('/search', (req, res, next) => {
    const { name } = req.body
    const regex = new RegExp('^[a-zA-Z0-9 \',]*' + name + '[a-zA-Z0-9 \',]*', 'i')
    
    Event
        .find({ name: { $regex: regex } })
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.get('/search', (req, res, next) => {
    const name = req.query.name
    const regex = new RegExp('^[a-zA-Z0-9 \',]*' + name + '[a-zA-Z0-9 \',]*', 'i')
    
    if (req.query.name) {
        Event
            .find({ name: { $regex: regex } })
            .then(response => res.json(response))
            .catch(err => next(err))
    } else {
        Event
            .find()
            .then(response => res.json(response))
            .catch(err => next(err))
    }
})

router.get('/myEvents', (req, res, next) => {           //corregir respuesta

    User                                                    
        .findById(req.user._id)
        .populate('events')
        .then(user => {
            let array = user.events
            res.json(response, { array, user: req.user })
        })
        .catch(err => next(err))
})

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
