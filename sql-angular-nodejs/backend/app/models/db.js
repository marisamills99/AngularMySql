const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  waitForConnections: true,
  multipleStatements: true,
  keepAliveInitialDelay: 10000, 
  enableKeepAlive: true,
  ssl: {
    rejectUnauthorized: false
  }
});
connection.on('connection', function (_conn) {
  if (_conn) {
      console.log('Connected the database via threadId '+ _conn.threadId);
      _conn.query('SET SESSION auto_increment_increment=1');
  }
});

module.exports = connection;
