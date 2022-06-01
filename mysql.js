const express = require("express");
const app = express();
const mysql = require("mysql");
const db = mysql.createPool({
  connectionLimit: 100,
  host: "dfmpc.mysql.database.azure.com", //Server
  user: "root_admin@dfmpc", // admin user
  password: "Password123", // password for the admin
  database: "dfmpc_sps", // Database name
  port: "3306", // port name, "3306" by default
});
db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("DB connected successful: " + connection.threadId);
});

const port = 3000;
app.listen(port, () => console.log(`Server Started on port ${port}...`));
