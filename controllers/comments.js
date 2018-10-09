
//评论操作

const comModel = require('../models/comments').commemtModel;

/**
 * 发布一条评论
 * @param {String} comment  需要插入的皮评论文档对象
 */
let createComment = function (comment) {
    return comModel.create(comment);
}




module.exports = {
    createComment
}