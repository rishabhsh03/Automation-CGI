const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Test connection
pool.query(`
    SELECT
        current_database(),
        current_user,
        current_schema(),
        COUNT(*) AS products
    FROM products;
`)
.then(res => {
    console.log(res.rows[0]);
})
.catch(err => console.error("DB TEST:", err));

module.exports = pool;