// 导入依赖
// 导入 mysql 驱动
const mysql = require('mysql2/promise');
// 导入数据库配置
const {db} = require('../config/config.default');

// 创建数据库连接池
const pool = mysql.createPool(db());

module.exports = pool;