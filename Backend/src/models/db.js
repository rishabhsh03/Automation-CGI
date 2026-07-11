const { Pool } = require("pg");

const pool = new pool({
    host:"localhost",
    user:"postgres",
    password:"1234",
    database:"userdb"
})

module.exports = pool;