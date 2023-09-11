// 导入 log4js
const log4js = require('log4js')
// 配置 log4js
log4js.configure({ // 复写配置信息
    appenders: { // 配置存储日志格式
        file: { // 配置存储类型
            type: 'file',// 配置存储类型为文件类型
            filename: 'logs/app.log', // 配置日志存储位置
            maxLogSize: 10 * 1024 * 1024, // 配置日志最大为10 MB
            backups: 3, // 超出最大大小，将保存备份，备份最大3个
            compress: true, // 启用Gzip压缩备份文件
            pattern: '-yyyy-MM-dd.log' // 保存日志写入时间戳
        },
        console: { // 配置控制台输出
            type: 'console', // 输出类型
        },
    },
    categories: { // 定义不同日志分类
        default: {appenders: ['file', 'console'], level: 'info'},// 配置默认分类
    }
});
// 实例化log4js对象
const logger = log4js.getLogger();

// 配置数据库
const db = () => {
    return {
        host: '127.0.0.1', // 连接地址
        user: 'root', // 数据库用户名
        password: '555555', // 数据库密码
        database: 'todos' // 数据库名称
    }
}

// 定义电话号码格式正则
const phoneRegExp = /^1[3456789]\d{9}$/;

// 定义密码私钥
const pwdPrivateKey = 'ce351a70-c5ee-475f-acf9-69a7a8d59091';
// 加盐次数
const encryptionLevel = 15;

// 定义 Token 私钥
const tokenPrivateKey = 'bce703d8-9d47-4724-aa78-27d412c614a5';

// 定义 Token 过期时间(一天)
const tokenExpiresIn = 60 * 60 * 24

// 抛出对象
module.exports = {
    logger,
    db,
    pwdPrivateKey,
    tokenPrivateKey,
    tokenExpiresIn,
    encryptionLevel,
    phoneRegExp
}
