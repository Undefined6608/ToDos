// 引入返回值类型
const {resultType, SUCCESS, FAIL} = require('../utils/response');
// 引入验证密码方法
const {verifyPwd} = require('../utils');
// 引入 model 方法
const {saveToDoSQL, queryToDoSQL, finishToDoSQL, delToDoSQL, updateToDoSQL} = require("../model/todosModel");
// 引入日志生成方法
const {logger} = require("../config/config.default");

/**
 * 保存代办
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const saveToDo = async (req, res, next) => {
    try {
        // 获取 传入的参数
        const body = req.body;
        // 获取用户信息
        const userInfo = req.user
        // 判断参数为空
        if (!body.event) return res.send(resultType(FAIL, "参数错误！"));
        // 验证参数是否安全
        // 获取当前时间
        const date = new Date();
        const time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        logger.warn(time);
        // 向数据库中添加待办项
        const insertStatus = await saveToDoSQL(userInfo.uid, body.event, time);
        // 保存失败
        if (insertStatus !== 2) return res.send(resultType(FAIL, "请重试！"));
        // 保存成功
        res.send(resultType(SUCCESS, "保存成功！"));
    } catch (err) {
        next(err)
    }
}

/**
 * 查询用户代办
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const queryToDo = async (req, res, next) => {
    try {
        // 获取用户信息
        const userInfo = req.user;
        // 验证参数是否安全
        // 在数据库中查询待办列表
        const query = await queryToDoSQL(userInfo.uid);
        // 暂无代办
        if (query.length <= 0) return res.send(resultType(FAIL, "暂无代办！"));
        // 查询成功
        res.send(resultType(SUCCESS, "查询成功！", query));
    } catch (err) {
        next(err)
    }
}

/**
 * 修改代办
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const modifyToDo = async (req, res, next) => {
    try {
        // 获取前端传入的参数
        const body = req.body;
        // 获取用户信息
        const userInfo = req.user;
        // 验证参数是否为空
        if (!body.id || !body.event) return res.send(resultType(FAIL, "参数错误"));
        // 验证参数是否安全
        // 在数据库中查询待办列表
        const update = await updateToDoSQL(body.event, userInfo.uid, body.id);
        // 修改失败
        if (update.changedRows !== 1) return res.send(resultType(FAIL, "修改失败！"));
        // 查询成功
        res.send(resultType(SUCCESS, "修改成功！"));
    } catch (err) {
        next(err);
    }
}

/**
 * 完成代办
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const finishToDo = async (req, res, next) => {
    try {
        // 获取 传入的参数
        const body = req.body;
        // 获取用户信息
        const userInfo = req.user;
        // 判断参数为空
        if (!body.id) return res.send(resultType(FAIL, "参数错误！"));
        // 验证参数是否安全
        // 获取当前时间
        const date = new Date();
        const time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        // 向数据库中更新完成项
        const updateStatus = await finishToDoSQL(body.id, userInfo.uid, time);
        // 设置失败
        if (updateStatus.changedRows !== 1) return res.send(resultType(FAIL, "设置失败！"));
        // 设置成功
        res.send(resultType(SUCCESS, "设置成功！"));
    } catch (err) {
        next(err);
    }
}

/**
 * 删除代办
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const deleteToDo = async (req, res, next) => {
    try {
        // 获取 传入的参数
        const body = req.body;
        console.log(body);
        // 获取用户信息
        const userInfo = req.user;
        // 判断参数为空
        if (!body.id || !body.password) return res.send(resultType(FAIL, "参数错误！"));
        // 验证密码是否正确
        if (!verifyPwd(body.password, req.user.pwd)) return res.send(resultType(FAIL, "密码错误！"));
        // 验证参数是否安全
        // 向数据库中更新完成项
        const deleteStatus = await delToDoSQL(body.id, userInfo.uid);
        console.log(deleteStatus.serverStatus)
        // 删除失败
        if (deleteStatus.changedRows !== 1) return res.send(resultType(FAIL, "删除失败！"));
        // 删除成功
        res.send(resultType(SUCCESS, "删除成功！"));
    } catch (err) {
        next(err);
    }
}

module.exports = {
    saveToDo,
    queryToDo,
    modifyToDo,
    finishToDo,
    deleteToDo
}