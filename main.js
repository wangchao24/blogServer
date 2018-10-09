//token 验证

var jwt = require('jsonwebtoken');


const secret = '123';
const s = '11';
let preload = {
    name:'wangchao',
    admin:true
};

let token = jwt.sign(preload,secret,{ expiresIn: '1s' });
console.log(token);


jwt.verify(token,s,(err,decode)=>{
    console.log(err)
    console.log(decode);
})

