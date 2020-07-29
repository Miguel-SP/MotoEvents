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
<<<<<<< HEAD
        .populate("joinedUsers")
=======
        .populate('joinedUsers')
>>>>>>> 4f17fb660854bfb3c3a4f36665891d96541c604c
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
    
    Event.find({ name: { $regex: regex } })
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.post('/eventDetails/delete/:id', checkAuthenticated, (req, res, next) => {

    Event.findByIdAndRemove(req.params.id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/eventDetails/join/:id', checkAuthenticated, (req, res, next) => {

    Event.findByIdAndUpdate(req.params.id, { $push: { joinedUsers: req.user._id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/eventDetails/update/:id', checkAuthenticated, (req, res, next) => {

    const { name, description, location, image_url, date, ownerId } = req.body

    Event.findByIdAndUpdate(req.params.id, { name, description, location, image_url, date, ownerId }, {new: true})
})

router.post('/eventDetails/deletefromevent/:id', checkAuthenticated, (req, res, next) => {

    Event.findByIdAndUpdate(req.params.id, { $pull: { joinedUsers: req.user._id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/eventDetails/newcomment/:id', checkAuthenticated, (req, res, next) => {

    const { user, date, text } = req.body
   

    Event.findByIdAndUpdate(req.params.id, { $push: { comments: { user, date, text } } }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})




module.exports = router
