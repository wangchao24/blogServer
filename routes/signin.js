//登录

const express = require('express');
const router = express.Router();
const UserModel = require('../controllers/users')
const jwt = require('jsonwebtoken');
const config = require('config-lite')(__dirname)

router.get('/checkLogin', function (req, res, next) {

    let token = req.cookies.token;
    jwt.verify(token, config.cet, (err, decode) => {
        if (err || !decode) {
            console.log(err);
            res.status(200).json({ login: false })
        } else {
            res.status(200).json({ login: true })
        }
    })
})
// GET /signin 登录页
router.get('/', function (req, res, next) {
    res.send('登录页')
})

// POST /signin 用户登录
router.post('/', function (req, res, next) {
    let name = req.body.name;
    let password = req.body.password;
    try {
        if (!name) {
            throw new Error('请填写用户名')
        }
        if (!password) {
            throw new Error('请填写密码')
        }
    } catch (e) {
        res.send({
            message: e.message
        })
    }
    UserModel.getUserByName(name).then((user) => {
        debugger;
        if (!user) {
            res.status(200).json({
                status: '700',
                message: '用户不存在'
            })
        }
        if (password !== user.password) {
            res.status(200).json({
                status: '701',
                message: '用户密码错误'
            })
        }
        config.preLoad.userName = name;
        config.preLoad.userId = user.id;
        let token = jwt.sign(config.preLoad, config.cet, { expiresIn: '1day' });
        res.cookie('token', token, {})
        res.send({
            message: '登录成功',
            status: '200',
            data: {
                userInfo: user._id
            }
        })
    })
})

module.exports = router