const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/User.model")
const bcrypt = require("bcrypt")



router.post('/signup', (req, res, next) => {

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

    User.findOne({ username }, (err, foundUser) => {

        if (err) {
            res.status(500).json({ message: "Usuario no encontrado." })
            return
        }

        if (foundUser) {
            res.status(400).json({ message: 'Usuario ya utilizado. Elige otro.' })
            return
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt)

        const aNewUser = new User({
            username: username,
            password: hashPass,
            userMotorbike: userMotorbike
        })

        aNewUser.save(err => {
            if (err) {
                res.status(400).json({ message: 'No se ha podido guardar el usuario en la base de datos.' });
                return
            }

            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {

                if (err) {
                    res.status(500).json({ message: 'No se pudo iniciar sesión tras crear usuario.' })
                    return
                }

                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                res.status(200).json(aNewUser)
            })
        })
    })
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Usuario o contraseña incorrectos' })
            return
        }

        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails);
            return
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'No se pudo guardar la sesión.' })
                return
            }

            // We are now logged in (that's why we can also send req.user)
            res.status(200).json(theUser)
        })
    })(req, res, next)
})

router.post('/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout()
    res.status(200).json({ message: 'Sesión cerrada!' })
})

router.get('/loggedin', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user)
        return
    }
    res.status(403).json({ message: 'No autorizado' })
})





module.exports = router