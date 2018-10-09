
//路由控制页

module.exports = function (app) {
    app.use('/signup', require('./signup'))
    app.use('/signin', require('./signin'))
    app.use('/signout', require('./signout'))
    app.use('/posts', require('./posts'))
    app.use('/comments', require('./comments'))
    app.use('/personCenter', require('./personCenter'))
}