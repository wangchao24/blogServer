module.exports = {
    port: 3000,
    session: {
        secret: 'myblog',
        key: 'myblog',
    },
    cet: 'myBlog',
    preLoad: {
        name: 'myBlog',
        admin: true
    },
    mongodb: 'mongodb://localhost:27017/myblog'
}