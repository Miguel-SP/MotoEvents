const express = require('express')
const router = express.Router()

const checkAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login')

const Event = require('../models/Event.model')


// Endpoints
router.get('/eventList', (req, res, next) => {

    Event.find()
        .populate('ownerId')
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/eventDetails/:id', checkAuthenticated, (req, res, next) => {

    Event.findById(req.params.id)
        .populate('ownerId')
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/newEvent', checkAuthenticated, (req, res, next) => {

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


router.post('/eventDetails/delete/:id', checkAuthenticated, (req, res, next) => {

    Event.findByIdAndRemove(req.params.id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/eventDetails/join/:id', checkAuthenticated, (req, res, next) => {

    Event
        .findByIdAndUpdate(req.params.id, { $push: { joinedUsers: req.user._id } })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/eventDetails/deletefromevent/:id', checkAuthenticated, (req, res, next) => {

    Event
        .findByIdAndUpdate(req.body, { $pull: { joinedUsers: req.user._id } })
        .then(response => res.json(response))
        .catch(err => next(err))
})




module.exports = router
