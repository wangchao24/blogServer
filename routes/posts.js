

//文章相关接口

const express = require('express');
const router = express.Router();
const PostModel = require('../controllers/post')
const jwt = require('jsonwebtoken');
const config = require('config-lite')(__dirname)
//文章主页
router.post('/', (req, res, next) => {
    let author = req.body.author;
    jwt.verify(req.cookies.token, config.cet, (err, decode) => {
        if (err) {
            console.log(err);
        } else {
            console.log(decode);
        }
    })
    PostModel.getPosts(author).then((result) => {
        res.status(200).json(result)
    })
})


//发表一篇文章
router.get('/create', (req, res, next) => {
    res.send('发表文章')
})


// GET /posts/create 发表文章页
router.post('/create', function (req, res, next) {
    let post;
    jwt.verify(req.cookies.token, config.cet, (err, decode) => {
        if (err) {
            res.status(200).json({
                login: false
            })
        } else {
            post = {
                title: req.body.title,
                content: req.body.content,
                author: decode.userName,
                authorId: decode.userId
            }
        }
    })

    PostModel.create(post).then((result) => {
        res.send(result.id);
    })
})


// GET /posts/:postId //文章详情页
router.get('/detail', function (req, res, next) {
    let postId = req.query.id;
    PostModel.getPostById(postId).then((result) => {
        res.json(result[0]);
    })

})

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', function (req, res, next) {
    res.send('更新文章页')
})


// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', function (req, res, next) {
    res.send('更新文章')
})

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', function (req, res, next) {
    res.send('删除文章')
})

module.exports = router