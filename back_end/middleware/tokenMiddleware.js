// 引入 token 依赖
const jwt = require('jsonwebtoken');
// 引入 返回值类型
const {resultType, AUTHORIZATION_ERROR, FAIL} = require("../utils/response");
// 引入 Token 私钥
const {tokenPrivateKey} = require("../config/config.default");
// 引入 Token 的数据库验证
const {verifyTokenSQL} = require("../model/userModel");
// 抛出中间件
module.exports = async function (req, res, next) {
    // 指定要排除的路径
    const excludedPaths = [
        '/api/user/hello',
        '/api/user/phoneOccupy',
        '/api/user/register',
        '/api/user/phoneLogin',
        '/api/user/sendEmailCode',
        "/api/user/forgetPassword",
    ];
    // 如果请求路径在排除列表中，则直接跳过中间件逻辑
    if (excludedPaths.includes(req.path)) return next();
    // 获取 Token
    const token = req.headers['authorization'];
    // 验证 Token 是否为空 并且 token 中含有 Bearer
    if (!token || token.substring(0, 7) !== 'Bearer ') return res.send(resultType(AUTHORIZATION_ERROR, "登录状态参数格式错误！"));
    // 获取 Token 字符串
    const tokenBody = token.split(' ')[1];
    // 验证传入的 Token 是否在数据库中
    if (await verifyTokenSQL(tokenBody)) return res.send(resultType(AUTHORIZATION_ERROR, "登录状态失效，请重新登录！"));
    // 验证 Token 正确性/是否过期
    jwt.verify(tokenBody, tokenPrivateKey, (err, decoded) => {
        // 如果 Token 错误/失效
        if (err) return res.send(resultType(AUTHORIZATION_ERROR, "登录状态失效，请重新登录！"));
        if (decoded.available === 1) return res.send(resultType(FAIL, "账号已注销！"))
        // 将用户信息添加到req对象中
        req.user = decoded;
        // 继续下一步
        next();
    });
}