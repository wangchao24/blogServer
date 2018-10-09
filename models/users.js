


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//创建用户模型
let userSchema = new Schema({
    name: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true },
})


exports.userModel = mongoose.model('user', userSchema)

