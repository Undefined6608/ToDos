// // 引入返回值类型
const {resultType, SERVER_ERROR} = require("../utils/response");
// 引入日志生成对象
const {logger} = require("../config/config.default");

// 抛出服务器错误中间件
module.exports = (err,req, res, next) => {
    // 将错误写入日志
    logger.error(err);
    res.send(resultType(SERVER_ERROR,"服务器发生未知错误！"));
    next();
}