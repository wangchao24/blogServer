
//登出


const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin

// GET /signout 登出
router.get('/', function (req, res, next) {
    res.cookie('token', '', {})
    res.status(200).json({
        message: '退出成功'
    })
})

module.exports = router