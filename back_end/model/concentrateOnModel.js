// 引入 MySQL 连接
const pool = require('../model');

/**
 * 创建专注条目
 * @param uid
 * @param createDate
 * @returns {Promise<number>}
 */
const startConcentrateOnTimeSQL = async (uid, createDate) => {
    // 调用 SQL 语句进行保存
    const [insert, _] = await pool.execute('INSERT INTO concentrate_on (user_id,start_time) VALUES (?,?)', [uid, createDate]);
    return insert.serverStatus;
}

/**
 * 查询专注列表
 * @param uid
 * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
 */
const queryConcentrateOnTimeSQL = async (uid) => {
    // 调用 SQL 语句进行查询
    const [select, _] = await pool.execute('SELECT * FROM concentrate_on WHERE user_id=?', [uid]);
    return select;
}

/**
 * 结束专注条目
 * @param uid
 * @param id
 * @param endDate
 * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
 */
const endConcentrateOnTimeSQL = async (uid, id, endDate) => {
    // 调用 SQL 语句进行保存
    const [update, _] = await pool.execute('UPDATE concentrate_on SET stop_time=?  WHERE user_id=? AND id=?', [endDate, uid, id]);
    return update;
}

module.exports = {
    startConcentrateOnTimeSQL,
    queryConcentrateOnTimeSQL,
    endConcentrateOnTimeSQL
}