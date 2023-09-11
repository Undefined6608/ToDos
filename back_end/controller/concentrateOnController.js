// 引入返回值类型
const {resultType, FAIL, SUCCESS} = require("../utils/response");
// 引入 model 方法
const {startConcentrateOnTimeSQL, endConcentrateOnTimeSQL, queryConcentrateOnTimeSQL} = require("../model/concentrateOnModel");

/**
 * 创建专注条目
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const createIntent = async (req, res, next) => {
    try {
        // 获取用户信息
        const userInfo = req.user;
        // 验证参数是否安全
        // 获取当前时间
        const date = new Date();
        const time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        // 向数据库中添加待办项
        const insertStatus = await startConcentrateOnTimeSQL(userInfo.uid, time);
        // 保存失败
        if (insertStatus !== 2) return res.send(resultType(FAIL, "请重试！"));
        // 保存成功
        res.send(resultType(SUCCESS, "保存成功！"));
    } catch (err) {
        // 跳转到错误处理中间件
        next(err);
    }
}

/**
 * 查询专注列表
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const queryIntent = async (req, res, next) => {
    try {
        // 获取用户信息
        const userInfo = req.user;
        // 验证参数是否安全
        // 向数据库中添加待办项
        const query = await queryConcentrateOnTimeSQL(userInfo.uid);
        // 保存失败
        if (query.length <= 0) return res.send(resultType(FAIL, "获取失败！"));
        // 保存成功
        res.send(resultType(SUCCESS, "查询成功！",query));
    } catch (err) {
        next(err);
    }
}

/**
 * 结束专注条目
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const endIntent = async (req, res, next) => {
    try {
        // 获取用户信息
        const userInfo = req.user;
        // 获取前端传入的参数
        const body = req.body;
        if (!body.id) return res.send(resultType(FAIL, "参数错误"));
        // 验证参数是否安全
        // 获取当前时间
        const date = new Date();
        const time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        // 向数据库中添加待办项
        const update = await endConcentrateOnTimeSQL(userInfo.uid, body.id, time);
        // 保存失败
        if (update.changedRows !== 1) return res.send(resultType(FAIL, "请重试！"));
        // 保存成功
        res.send(resultType(SUCCESS, "保存成功！"));
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createIntent,
    queryIntent,
    endIntent
};