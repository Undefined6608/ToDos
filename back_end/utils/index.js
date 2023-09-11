// 导入加密依赖
const bcrypt = require('bcrypt');
// 导入 Token 依赖
const jwt = require('jsonwebtoken');
// 导入私钥、加盐次数、电话号码验证正则、Token私钥、token过期时间
const {pwdPrivateKey, encryptionLevel, phoneRegExp, tokenPrivateKey, tokenExpiresIn} = require('../config/config.default');

/**
 * 验证电话号码格式是否正确
 * @param str
 * @returns {boolean}
 */
const phoneCharacter = (str) => {
    return !phoneRegExp.test(str)
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

// 抛出方法
module.exports = {
    encryption,
    verifyPwd,
    phoneCharacter,
    setToken
}