// 引入 MySQL 连接
const pool = require('../model');

/**
 * 添加反馈内容
 * @param uid
 * @param backContent
 * @returns {Promise<number>}
 */
const insertFeedBackSQL = async (uid, backContent) => {
    const [insert, _] = await pool.query('INSERT INTO feedback(user_id,content) VALUES(?,?)', [uid, backContent]);
    return insert.serverStatus;
}

module.exports = {
    insertFeedBackSQL
}