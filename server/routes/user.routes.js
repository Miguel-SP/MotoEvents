const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10


const checkAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login')


const User = require('../models/User.model')


// Endpoints


router.get('/profile/:id', checkAuthenticated, (req, res, next) => {           

    User                                                    
        .findById(req.params.id)
        .populate('events')
        .then(response => res.json(response))
        .catch(err => next(err))

})

router.post('/profile/edit/:id', checkAuthenticated, (req, res, next) => {

    const username = req.body.username
    const password = req.body.password
    const userMotorbike = req.body.userMotorbike
    
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)
    
    console.log(req.body.userMotorbike)
    User.
        findByIdAndUpdate(req.user._id, { username: username, password: hashPass, userMotorbike: userMotorbike }, { new: true })
        .then(response => res.json(response))
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

router.post('/eventDetails/:id', checkAuthenticated, (req, res, next) => {

    User
        .findByIdAndUpdate(req.user._id, { $push: { events: req.params.id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/eventDetails/deletefromuser/:id', checkAuthenticated, (req, res, next) => {

    User
        .findByIdAndUpdate(req.user._id, { $pull: { events: req.params.id } }, {new: true})
        .then(response => res.json(response))
        .catch(err => next(err))
})


module.exports = router
