const { Database } = require('@blocklet/sdk');

// 创建 NeDB 实例
const db = new Database('remotes.db');

module.exports = db;
