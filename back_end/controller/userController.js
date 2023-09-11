// 引入返回值类型
const {SUCCESS, FAIL, resultType, AUTHORIZATION_ERROR} = require('../utils/response');
// 引入 密码加密 电话号码格式验证 密码验证 token 生成方法
const {encryption, phoneCharacter, verifyPwd, setToken} = require("../utils");
// 引入 model 方法
const {registerSQl, occupySQL, phoneLoginSQL, insertToken, getTokenSQL, modifyTokenSQL, deleteToken} = require("../model/userModel");
const {logger} = require("../config/config.default");
/**
 * '/hello' 路由
 * @param req
 * @param res
 * @param next
 */
const hello = (req, res, next) => {
    res.send('HelloWorld!');
}

/**
 * 电话号码查重
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const phoneOccupy = async (req, res, next) => {
    try {
        // 1.获取请求体数据
        const body = req.body;
        // 2.数据验证
        // 判断是否为空
        if (!body.phone) return res.send(resultType(FAIL, "电话号码为空"));
        // 判断是否含有非法字符
        // 判断电话号码格式是否正确
        if (phoneCharacter(body.phone)) return res.send(resultType(FAIL, "电话号码格式错误！"));
        // 3.验证通过，通过查找数据库判断是否重复
        if (await occupySQL('phone', body.phone)) return res.send(resultType(FAIL, "电话号码重复!"));
        // 4.发送成功响应
        res.send(resultType(SUCCESS, "可以使用"));
    } catch (err) {
        next(err);
    }
};

/**
 * 注册
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const register = async (req, res, next) => {
    try {
        // 获取前端传入的参数
        const body = req.body;
        // 验证参数是否为空
        if (!body.username || !body.password || !body.phone || !body.email) return res.send(resultType(SUCCESS, "参数错误！"));
        // 判断电话号码格式是否正确
        if (phoneCharacter(body.phone)) return res.send(resultType(FAIL, "电话号码格式错误！"));
        // 3.验证通过，通过查找数据库判断是否重复
        if (await occupySQL('phone', body.phone)) return res.send(resultType(FAIL, "此电话号码已被注册，请前往登录!"));
        // 验证数据是否安全
        // 将 password 进行加密
        body.password = encryption(body.password);
        // 将数据存入数据库
        const insertCount = await registerSQl(body);
        if (insertCount !== 2) return res.send(resultType(FAIL, "注册失败！"));
        res.send(resultType(SUCCESS, "注册成功！"));
    } catch (err) {
        next(err);
    }
}

/**
 * 电话号码登录
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const phoneLogin = async (req, res, next) => {
    try {
        // 获取前端传入的参数
        const body = req.body;
        // 验证参数是否为空
        if (!body.phone || !body.password) return res.send(resultType(SUCCESS, "参数错误！"));
        // 判断电话号码格式是否正确
        if (phoneCharacter(body.phone)) return res.send(resultType(FAIL, "电话号码格式错误！"));
        // 验证数据是否安全
        // 验证账号密码的正确性
        const queryUser = await phoneLoginSQL(body.phone);
        // 如果用户不存在
        if (!queryUser) return res.send(resultType(FAIL, "账号不存在"));
        // 判断密码是否正确
        if (!verifyPwd(body.password, queryUser.pwd)) return res.send(resultType(AUTHORIZATION_ERROR, "账号/密码错误！"));
        // 获取数据库里的 Token
        const tokenData = await getTokenSQL(queryUser.uid);
        // 生成 Token
        const token = setToken(queryUser);
        // 判断是否已经存入 Token
        if (tokenData) {
            // 更新 Token
            const update = await modifyTokenSQL(queryUser.uid, token);
            // 更新失败
            if (update.changedRows !== 1) return res.send(resultType(FAIL, "登录失败！"));
            // 更新完成
            res.send(resultType(SUCCESS, "登录成功！", {
                token: token
            }));
            return;
        }
        // 将 Token 存入数据库
        const insertCount = await insertToken(queryUser.uid, token);
        // 存入失败
        if (insertCount !== 2) return res.send(resultType(FAIL, "登录失败！"));
        // 登录成功
        res.send(resultType(SUCCESS, "登录成功！", {
            token: token
        }));
    } catch (err) {
        next(err);
    }
}

// 退出登录
const logout = async (req, res, next) => {
    try {
        // 获取用户 ID
        const userInfo = req.user;
        // 删除 Token
        const deleteStatus = await deleteToken(userInfo.uid);
        // 删除失败
        if (!deleteStatus) return res.send(resultType(FAIL, "退出失败！"));
        // 删除成功
        res.send(resultType(SUCCESS, "退出成功！"));
    } catch (err) {
        next(err);
    }
}


// 抛出控制器
module.exports = {
    hello,
    phoneOccupy,
    register,
    phoneLogin,
    logout
}