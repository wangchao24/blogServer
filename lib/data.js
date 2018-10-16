//数据处理中间件

//成功数据请求封装
let successRes = function (req, res, next,data) {
     let options = {
         status:res.status,
         statusText:res.statusText,
         data:data,
     }
     res.send(options);
}


//错误数据请求封装
let errorRes = function (req, res, next) {

}


module.exports = {
    successRes
}