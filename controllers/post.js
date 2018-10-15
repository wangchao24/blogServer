const PostModel = require("../models/post.js").postModel;
const ObjectId = require('mongoose').Types.ObjectId;

//添加一篇文章
let create = function (post) {
    //articleId 有就更新 没有就 新建
     if(post.articleId){
       
     }else {
          return PostModel.create(post);
     }

   
}




//通过id获取一篇文章
let getPostById = function (id) {
    PostModel
        .findOneAndUpdate(
        { '_id': ObjectId(id) },
        { $inc: { "pv": 1 } }
        ).exec()

    return PostModel
        .aggregate([
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: "articleId",
                    as: 'comments'
                },
            },
            {
                $match: {
                    '_id': ObjectId(id)
                }
            }
        ])
}



//查询文章列表
let getPosts = function (authorId) {
    const query = {};
    if (authorId) {
        query.authorId = authorId;
    }

    return PostModel
        .aggregate([
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: "articleId",
                    as: 'comments'
                },
            },
            {
                $match: query
            }
        ]
        )

    // return PostModel
    //     .find(query)
    //     .exec()
}
//更新文章的浏览人数
let upDatePv = function (id, pv) {

}
module.exports = {
    create,
    getPostById,
    getPosts
}