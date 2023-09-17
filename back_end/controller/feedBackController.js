const {resultType, FAIL, SUCCESS} = require("../utils/response");
const {insertFeedBackSQL} = require('../model/feedBackModel')

/**
 * 添加反馈
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const addFeedBack = async (req, res, next) => {
    try {
        const body = {...req.body};
        const user = req.user;
        if (!body.backContent) {
            res.send(resultType(FAIL, "参数错误！"));
            return;
        }
        // 验证反馈信息安全

        // 将反馈信息添加到数据库中
        const insert = await insertFeedBackSQL(user.uid, body.backContent);
        if (insert !== 2) {
            res.send(resultType(FAIL, "添加失败！"));
            return;
        }
        res.send(resultType(SUCCESS, "感谢您的反馈！"));

    } catch (e) {
        next(e);
    }

}

module.exports = {
    addFeedBack
};