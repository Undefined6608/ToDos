// 引入 MySQL 连接
const pool = require('../model');

/**
 * 代办事项保存
 * @param uid
 * @param event
 * @param createDate
 * @returns {Promise<number>}
 */
const saveToDoSQL = async (uid, event, createDate) => {
    // 调用 SQL 语句进行保存
    const [insert, _] = await pool.execute('INSERT INTO todo (user_id,event,create_date) VALUES (?,?,?)', [uid, event, createDate]);
    return insert.serverStatus;
}

/**
 * 查询用户代办列表
 * @param uid
 * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
 */
const queryToDoSQL = async (uid) => {
    // 调用 SQL 语句进行查询
    const [query, _] = await pool.execute('SELECT id,event,complete,create_date,finish_date,is_delete FROM todo WHERE user_id=?', [uid]);
    return query;
}

/**
 * 修改代办
 * @param event
 * @param uid
 * @param id
 * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
 */
const updateToDoSQL = async (event, uid, id) => {
    // 调用 SQL 语句进行查询
    const [update, _] = await pool.execute('UPDATE todo SET event=?  WHERE user_id=? AND id=?', [event, uid, id]);
    return update;
}

/**
 * 用户完成代办
 * @param id
 * @param uid
 * @param finishDate
 * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
 */
const finishToDoSQL = async (id, uid, finishDate) => {
    // 调用 SQL 语句进行更新
    const [update, _] = await pool.execute('UPDATE todo SET complete = 1,finish_date = ? WHERE id=? AND user_id=?', [finishDate, id, uid]);
    return update;
}

/**
 * 用户删除代办
 * @param id
 * @param uid
 * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
 */
const delToDoSQL = async (id, uid) => {
    // 调用 SQL 语句进行删除
    const [del, _] = await pool.execute('UPDATE todo SET is_delete=1 WHERE id=? AND user_id=?', [id, uid]);
    return del;
}

module.exports = {
    saveToDoSQL,
    queryToDoSQL,
    finishToDoSQL,
    updateToDoSQL,
    delToDoSQL
}