
//注册


const express = require('express')
const router = express.Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /signup 注册页
router.get('/', function (req, res, next) {
    res.send('注册页')
})

// POST /signup 用户注册
router.post('/', function (req, res, next) {
    res.send('注册')
})

module.exports = router