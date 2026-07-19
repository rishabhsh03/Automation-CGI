const db = require("../models/db");

const findUserByEmail = async (email) => {
    const result = await db.query(`
        SELECT * FROM users
        WHERE email = $1
        `,
    [email]
    );
    return result.rows[0];
};

    // Create new User
    const createUser = async (
        name,
        email,
        phone,
        password,
        role,
        organization_id
    ) => {
        const result = await db.query(`
            INSERT INTO users
            (
              name,
              email,
              phone,
              password,
              role,
              organization_id
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *     
            `,
            [
                name,
                email,
                phone,
                password,
                role,
                organization_id,
            ]
        );
        return result.rows[0];
        
    };

module.exports = {
    findUserByEmail,
    createUser,
}