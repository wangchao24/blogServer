//评论

const express = require('express');
const router = express.Router();
const ComModel = require('../controllers/comments.js')
const jwt = require('jsonwebtoken');
const config = require('config-lite')(__dirname)



// POST /comments 创建一条留言
router.post('/', function (req, res, next) {
    let userId;
    let content = req.body.content;
    let articleId = req.body.articleId;
    jwt.verify(req.cookies.token, config.cet, (err, decode) => {
        if (err) {
            console.log(err);
        } else {
            userId = decode.userId;
        }
    })

    let comment = {
        content: content,
        articleId: articleId,
        userId: userId
    }

    ComModel.createComment(comment).then(result => {
        res.status(200).json({
            message: '添加评论成功'
        })
    })

})
//POSt //comments/:articleId  查询一篇文章的所有留言

// GET /comments/:commentId/remove 删除一条留言
router.get('/:commentId/remove', function (req, res, next) {
    res.send('删除留言')
})


module.exports = router