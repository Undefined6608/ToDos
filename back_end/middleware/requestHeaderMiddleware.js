module.exports = function (req, res, next) {
    // 允许任何请求地址访问
    res.setHeader("Access-Control-Allow-Origin", "*");
    // 允许任何请求携带自定义数据访问
    res.setHeader("Access-Control-Allow-Headers", "*");
    // 允许使用的请求方法
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    // 继续下一步
    next();
}