// 引入 express
const express = require('express');
// 导入 logger 日志对象
const {logger} = require('./config/config.default');
// 导入morgan
const morgan = require('morgan');
// 导入路由
const router = require('./router');

// 创建 express 对象
const app = express();

// 挂载 morgan
app.use(morgan('dev'));

// 配置和挂载解析body请求体方法
app.use(express.json());
app.use(express.urlencoded({extended: false, limit: '20mb'}));

// 配置请求头
app.use(require('./middleware/requestHeaderMiddleware'));

// 配置 Token 验证
app.use(require('./middleware/tokenMiddleware'));

// 配置路由
/*app.get('/hello', (req, res, next) => {
    res.send("HelloWorld!");
})*/

// 挂载路由,所有的请求都以/api开头
app.use('/api', router);

// 挂载请求错误中间件
app.use(require('./middleware/serverErrorMiddleware'));

// 启动服务
app.listen(6000, () => {
    logger.warn("项目启动成功！端口：6000");
})