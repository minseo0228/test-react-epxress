const mysql = require("mysql2/promise");

let pool;

const createPool = async () => {
  if (pool) return pool;

  pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "qwer1234",
  });

  return pool;
};

const getPool = () => pool;

module.exports = { createPool, getPool };
