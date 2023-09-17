// 导入加密依赖
const bcrypt = require('bcrypt');
// 导入 Token 依赖
const jwt = require('jsonwebtoken');
// 引入邮箱验证
const {sendEmail} = require('node-send-email');
// 导入私钥、加盐次数、电话号码验证正则、Token私钥、token过期时间
const {
    pwdPrivateKey,
    encryptionLevel,
    phoneRegExp,
    tokenPrivateKey,
    tokenExpiresIn,
    getEmailParam, logger, emailRegExp, codeRegExp
} = require('../config/config.default');

/**
 * 验证电话号码格式是否正确
 * @param str
 * @returns {boolean}
 */
const phoneCharacter = (str) => {
    return !phoneRegExp.test(str);
}

/**
 * 验证邮箱格式
 * @param str
 * @returns {boolean}
 */
const emailCharacter = (str) => {
    return !emailRegExp.test(str);
}

const codeCharacter = (str) => {
    return !codeRegExp.test(str);
}

/**
 * 定义加密方法
 * @param pwd
 * @returns string
 */
const encryption = (pwd) => {
    return bcrypt.hashSync(pwd + pwdPrivateKey, encryptionLevel);
}

/**
 * 验证密码正确性
 * @param iptPwd
 * @param savePwd
 * @returns boolean
 */
const verifyPwd = (iptPwd, savePwd) => {
    return bcrypt.compareSync(iptPwd + pwdPrivateKey, savePwd);
}


// 用于生成 token
const setToken = function (userInfo) {
    return jwt.sign(userInfo, tokenPrivateKey, {expiresIn: tokenExpiresIn});
}

// 生成验证码
const generateCode = () => {
    return String(Math.floor(Math.random() * 1000000)).padEnd(6, '0');
}

// 邮件发送
const sendEmailTool = async (toEmail) => {
    const code = generateCode();
    return await new Promise((resolve, reject) => {
        sendEmail(getEmailParam(toEmail, code), (result) => {
            if (result) {
                resolve(code);
                return;
            }
            reject("发送失败");
        })
    });
}

// 抛出方法
module.exports = {
    encryption,
    verifyPwd,
    codeCharacter,
    phoneCharacter,
    emailCharacter,
    setToken,
    sendEmailTool
}