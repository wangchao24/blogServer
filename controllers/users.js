
const UserModel = require("../models/users.js").userModel;


/**
 * 注册用户
 * @param {Object} user 注册用户信息
 */
let create = function (user) {
    return UserModel.create(user);
}

/** 
 * 登录
 * 登录时 根据用户名获取用户信息
 * @param {String} name  登录名
 */
let getUserByName = function (name) {
    // debugger
    // let query = {};
    // if (name) {
    //     query.name = name;
    // }
    return UserModel
        .findOne({name:name})
        .exec()
}

module.exports = {
    create,
    getUserByName
}