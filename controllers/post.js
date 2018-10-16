const PostModel = require("../models/post.js").postModel;
const ObjectId = require('mongoose').Types.ObjectId;

//添加一篇文章
let create = function (post) {
    if (post.articleId) {
        return PostModel.update({ "_id": ObjectId(post.articleId) }, post, { upsert: true });
    } else {
        delete post.articleId;
        return PostModel.create(post);
    }
    //articleId 有就更新 没有就 新建

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
let getPosts = function (query) {
    debugger;
    let cond = {};
    if (query.authorId) {
        cond.authorId = query.authorId
    }
    let currentpage = parseInt(query.currentPage == 1 ? 0 : query.currentPage);
    let pageSize = parseInt(query.pageSize);

    return PostModel.find(cond).exec().then(res => {
        let total = res.length;
        let result = {};
        result.total = total;
        result.pageSize = query.pageSize;
        result.currentPage = query.currentPage;
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
                    $match: cond
                },
                {
                    $skip: currentpage
                },
                {
                    $limit: pageSize
                }
            ]
            ).then((v) => {
                result.list = v;
                return result;
            })


    });

    // .aggregate([
    //     {
    //         $lookup: {
    //             from: 'comments',
    //             localField: '_id',
    //             foreignField: "articleId",
    //             as: 'comments'
    //         },
    //     },
    //     {
    //         $match: cond
    //     },
    //     {
    //         $skip: currentpage
    //     },
    //     {
    //     }
    // ]
    // ).then((res)=>{
    //     return res;
    // })



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