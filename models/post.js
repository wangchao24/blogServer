var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//创建文章模型
let postSchema = new Schema({
    title: { type: 'string', required: true },
    content: { type: 'string', required: true },
    author: { type: 'string', required: true },
    authorId: { type: 'string', required: true },
    creatTime: { type: 'Date', default: new Date() },
    pv: { type: 'Number', default: 0 }
})


exports.postModel = mongoose.model('post', postSchema)