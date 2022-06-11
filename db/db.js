const sql = require("mysql2");

// db config
const db = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "staff",
});

module.exports = db;
