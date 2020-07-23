const express = require('express')
const router = express.Router()

const checkAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login')


const User = require('../models/User.model')

// Endpoints


router.get('/myEvents', checkAuthenticated, (req, res, next) => {           //corregir respuesta

    User                                                    
        .findById(req.user._id)
        .populate('events')
        .then(user => {
            let array = user.events
            res.json(response, { array, user: req.user })
        })
        .catch(err => next(err))
})

// router.post('/myEvents/add/:event_id', checkAuthenticated, (req, res, next) => {

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
