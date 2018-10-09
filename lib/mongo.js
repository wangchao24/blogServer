


//链接数据库
const config = require('config-lite')(__dirname)
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/myblog', (err) => {
    if (err) {
        console.log('链接数据库失败')
    } else {
        console.log('链接数据库成功')
    }
})




