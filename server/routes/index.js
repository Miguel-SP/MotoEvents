module.exports = app => {

    // Base URLS
    app.use('/api', require('./base.routes'))
    app.use('/api', require('./auth.routes'))

}