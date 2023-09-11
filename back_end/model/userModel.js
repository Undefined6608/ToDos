// 引入 MySQL 连接
const pool = require('../model');
/**
 * 验证表中字段是否重复
 * @param tag
 * @param value
 * @returns {Promise<boolean>}
 */
const occupySQL = async (tag, value) => {
    // 调用 SQL 语句进行查重
    const [query, _] = await pool.execute(`SELECT uid from sys_user WHERE ${tag}=?`, [value]);
    // 如果能查出来，则为重复
    return query.length !== 0;
}

/**
 * 注册 SQL
 * @param userInfo
 * @returns {Promise<number>}
 */
const registerSQl = async (userInfo) => {
    // 调用 SQL 语句进行向表内添加条目
    const [insert, _] = await pool.execute('INSERT INTO sys_user (name, pwd, phone, email) VALUES (?, ?, ?, ?)', [userInfo.username, userInfo.password, userInfo.phone, userInfo.email]);
    // 返回SQL执行后的返回值
    return insert.serverStatus;
}

/**
 * 电话号码登录
 * @param phone
 * @returns {Promise<object>}
 */
const phoneLoginSQL = async (phone) => {
    // 调用 SQL 查询账号信息
    const [query, _] = await pool.execute('SELECT uid,phone,pwd,available,power from sys_user WHERE phone=?', [phone]);
    // 返回 SQL 执行后返回的值
    return query[0];
}

/**
 * 通过用户ID获取Token
 * @param uid
 * @returns {Promise<*>}
 */
const getTokenSQL = async (uid) => {
    const [query, _] = await pool.execute('SELECT id,user_id,token FROM sys_token WHERE user_id=?', [uid]);
    return query[0];
}

/**
 * 验证 Token 是否在数据库内存在
 * @param token
 * @returns {Promise<boolean>}
 */
const verifyTokenSQL = async (token) => {
    const [query, _] = await pool.execute('SELECT id FROM sys_token WHERE token=?', [token]);
    return query.length < 1;
}

/**
 * 修改 Token
 * @param uid
 * @param token
 * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
 */
const modifyTokenSQL = async (uid, token) => {
    const [update, _] = await pool.execute('UPDATE sys_token SET token=? WHERE user_id=?', [token, uid]);
    return update;
}

/**
 * 向数据库中添加 Token
 * @param uid
 * @param token
 * @returns {Promise<number>}
 */
const insertToken = async (uid, token) => {
    // 调用 SQL 向表中添加条目
    const [insert, _] = await pool.execute('INSERT INTO sys_token (user_id, token) VALUES (?,?)', [uid, token]);
    // 返回SQL执行后的返回值
    return insert.serverStatus;
}

/**
 * 退出登录
 * @param uid
 * @returns {Promise<boolean>}
 */
const deleteToken = async (uid) => {
    // 调用 SQL 删除表内 Token
    const [del,_] = await pool.execute('DELETE FROM sys_token WHERE user_id = ?', [uid]);
    // 返回 SQL 执行后的返回值
    return del.affectedRows === 1;
}

// 抛出方法
module.exports = {
    occupySQL,
    registerSQl,
    phoneLoginSQL,
    getTokenSQL,
    verifyTokenSQL,
    modifyTokenSQL,
    insertToken,
    deleteToken
}