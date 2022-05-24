var mysql = require("mysql2");

var db = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "owner_db"
});

db.connect(function(err) {
  if (err) throw err;
  
});

module.exports = db;