module.exports = app => {

    // Base URLS
    app.use('/api', require('./auth.routes'))
    app.use('/api', require('./events.routes'))
    app.use('/api', require('./user.routes'))
    app.use('/api', require('./motorbikes.routes'))
    app.use((req, res) => {res.sendFile(__dirname + "/public/index.html")})

}