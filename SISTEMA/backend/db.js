const mysql = require("mysql2/promise");

const conexao = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "fale_conosco",
});

module.exports = conexao;
