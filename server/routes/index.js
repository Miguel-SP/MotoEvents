module.exports = app => {

    // Base URLS
    app.use('/api', require('./auth.routes'))
    app.use('/api', require('./events.routes'))
    app.use('/api', require('./user.routes'))

}