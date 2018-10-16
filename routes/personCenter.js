const express = require('express');
const router = express.Router();
const PostModel = require('../controllers/post')
const jwt = require('jsonwebtoken');
const config = require('config-lite')(__dirname)



//个人主页文章列表
router.get("/", (req, res, next) => {
    let query = {};
    jwt.verify(req.cookies.token, config.cet, (err, decode) => {
        if (err) {
            res.send(err);
        } else {
            query.authorId = decode.userId
        }
    })

    PostModel.getPosts(query).then((result) => {

        res.status(200).json(result);
    })

})

module.exports = router;