const path = require('path')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
const routes = require('./routes')
const bodyParser = require('body-parser');
const pkg = require('./package')
const mongoose = require('mongoose')
const dataFun = require("./lib/data.js")
const cookieParser = require('cookie-parser')
const app = express()

//cookie 解析中间件
app.use(cookieParser())

//链接数据库
mongoose.connect(config.mongodb, (err) => {
    if (err) {
        console.log('链接数据库失败')
    } else {
        console.log('链接数据库成功')
    }
})





app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(bodyParser.json());
// session 中间件
app.use(session({
    // name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
    // // genid: function (req) {
    // //     return uid(24);
    // // },
    // secret: '123', // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    // resave: false, // 强制更新 session
    // saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    // rolling:false,
    // cookie: {
    // //     maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    // },
    secret: 'passwd',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({// 将 session 存储到 mongodb
        url: config.mongodb// mongodb 地址
    })
}))


app.use(flash())

// 路由
routes(app)


// 监听端口，启动程序
app.listen(config.port, function () {
    console.log(`${pkg.name} listening ${config.port}`)
})