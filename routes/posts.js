

//文章相关接口

const express = require('express');
const router = express.Router();

//文章主页
router.get('/', (req, res, next) => {
    res.send("123")
})


//发表一篇文章
router.get('/create', (req, res, next) => {
    res.send('发表文章')
})


// GET /posts/create 发表文章页
router.get('/create', function (req, res, next) {
    res.send('发表文章页')
})


// GET /posts/:postId //文章详情页
router.post('/:postId', function (req, res, next) {
    res.send('文章详情页')
})

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit',function (req, res, next) {
    res.send('更新文章页')
})


// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit',function (req, res, next) {
    res.send('更新文章')
})

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove',function (req, res, next) {
    res.send('删除文章')
})

module.exports = router