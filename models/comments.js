//评论模型

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let commentSchema = new Schema({
    content: { type: 'String', required: true },
    articleId: { type: 'ObjectId', required: true },
    userId: { type: 'String', required: true }
})


exports.commemtModel = mongoose.model('comment', commentSchema);
