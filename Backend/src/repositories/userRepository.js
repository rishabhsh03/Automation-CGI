// userRepository.js

const db = require("../models/db");

const getUsers = async () => {

    const result = await db.query(`
        SELECT
            id,
            name,
            email,
            role
        FROM users
        ORDER BY name;
    `);

    return result.rows;
};

module.exports = {
    getUsers
};