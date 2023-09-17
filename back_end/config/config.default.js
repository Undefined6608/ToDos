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
    // 本地
    return {
        host: '127.0.0.1', // 连接地址
        user: 'root', // 数据库用户名
        password: '555555', // 数据库密码
        database: 'todos' // 数据库名称
    }
    // 服务器
    /*return {
        host: '127.0.0.1', // 连接地址
        user: 'todos', // 数据库用户名
        password: 'CZLjXFpcCcFMMxka', // 数据库密码
        database: 'todos' // 数据库名称
    }*/
}

// 定义电话号码格式正则
const phoneRegExp = /^(13[0-9]|14[5-9]|15[0-35-9]|16[6]|17[0-8]|18[0-9]|19[0-9]|147|166|192|198|17[0-1]|162)\d{8}$/;

// 定义邮箱格式正则
const emailRegExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

// 定义验证码格式
const codeRegExp = /^\d{6}$/;

// 定义密码私钥
const pwdPrivateKey = 'ce351a70-c5ee-475f-acf9-69a7a8d59091';
// 加盐次数
const encryptionLevel = 15;

// 定义 Token 私钥
const tokenPrivateKey = 'bce703d8-9d47-4724-aa78-27d412c614a5';

// 定义 Token 过期时间(一天)
const tokenExpiresIn = 60 * 60 * 24

//发送邮件需要的入参
const getEmailParam = (toEmail, code) => {
    return {
        //邮箱类型，@qq.com就传qq，@163.com就是传163，不传的话默认为qq，
        //其余类型可以在node_modules/node-send-email/service.js中找到。
        type: 'qq',
        // 发件人
        name: 'CoBlog站长',
        // 发件箱，要与收件箱邮箱类型一致
        from: 'co-blog@qq.com',
        // 发件箱smtp,需要去邮箱—设置–账户–POP3/SMTP服务—开启—获取stmp授权码
        smtp: 'qgiegwujfquqbjfd',
        // 发送的邮件标题
        subject: '验证码',
        // 收件箱，要与发件箱邮箱类型一致
        to: toEmail,
        // 邮件内容，HTML格式
        html: `
            <p>您好！</p>
            <p>您的验证码是：<strong style="color:orangered;">${code}</strong></p>
            <p>如果不是您本人操作，请无视此邮件</p>
        `
    }
};

// 抛出对象
module.exports = {
    logger,
    db,
    pwdPrivateKey,
    tokenPrivateKey,
    tokenExpiresIn,
    encryptionLevel,
    codeRegExp,
    phoneRegExp,
    emailRegExp,
    getEmailParam
}
