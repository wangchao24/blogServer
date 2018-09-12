//登录

const express = require('express');
const router = express.Router();



// GET /signin 登录页
router.get('/', function (req, res, next) {
  res.send('登录页')
})

// POST /signin 用户登录
router.post('/',  function (req, res, next) {
  res.send('登录')
})

module.exports = router