const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10


const checkAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login')


const User = require('../models/User.model')


// Endpoints


router.post('/eventDetails/addevent/:id', checkAuthenticated, (req, res, next) => {

    User
        .findByIdAndUpdate(req.user._id, { $push: { events: req.params.id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/eventDetails/deletefromuser/:id', checkAuthenticated, (req, res, next) => {

    User
        .findByIdAndUpdate(req.user._id, { $pull: { events: req.params.id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/profile/:id', checkAuthenticated, (req, res, next) => {           

    User                                                    
        .findById(req.params.id)
        .populate('events')
        .populate('userMotorbike')
        .populate('friends')
        .then(response => res.json(response))
        .catch(err => next(err))

})

router.get('/profile/public/:id', checkAuthenticated, (req, res, next) => {

    User
        .findById(req.params.id)
        .populate('events')
        .populate('userMotorbike')
        .populate('friends')
        .then(response => res.json(response))
        .catch(err => next(err))

})

router.post('/profile/edit/:id', checkAuthenticated, (req, res, next) => {

    const username = req.body.username
    const password = req.body.password
    const userMotorbike = req.body.userMotorbike

    if (!username || !password) {
        res.status(400).json({ message: 'Introduce usuario y contraseña' })
        return
    }

    if (password.length < 4) {
        res.status(400).json({ message: 'Por favor, crea una contraseña de al menos 4 caracteres para mayor seguridad.' });
        return
    }

        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt)

    User.
        findByIdAndUpdate(req.user._id, { username: username, password: hashPass, userMotorbike: userMotorbike }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.post('/profile/addfriend/:id', checkAuthenticated, (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $push: { friends: req.params.id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})

module.exports = router
