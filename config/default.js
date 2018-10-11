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
    mongodb: 'mongodb://blog:123456@119.29.117.120:27017/myblog'
}