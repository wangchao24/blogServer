
//注册


const fs = require('fs')
const path = require('path')
const sha1 = require('sha1')
const express = require('express')
const router = express.Router()
const UserModel = require('../controllers/users')



// GET /signup 注册页
router.get('/', function (req, res, next) {
    res.send('注册页')
})

// POST /signup 用户注册
router.post('/', function (req, res, next) {
    const name = req.body.name;
    const password = req.body.passWord;
    //校验用户参数
    try {
        if (!(name.length >= 1 && name.length < 10)) {
            throw new Error('名字请限制在1-10个字符')
        }
    } catch (e) {
        res.send({
            message: e.message
        })
    }



    // 待写入数据库的用户信息
    let user = {
        name: name,
        password: password,
    }
    // 用户信息写入数据库
    UserModel.create(user)
        .then(function (result) {
            // 此 user 是插入 mongodb 后的值，包含 _id
            req.session.user = result.id;
            // 跳转到首页
            res.send({
                mes: '注册成功'
            })
        })
        .catch(function (e) {

            res.send({
                message: '用户名已经存在'
            })
            // 注册失败，异步删除上传的头像
            // 用户名被占用则跳回注册页，而不是错误页
        })

})

module.exports = router