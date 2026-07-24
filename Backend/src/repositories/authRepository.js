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
const saveOTP = async (email, otp) => {

    // Delete previous OTP for this email
    await db.query(
        `
        DELETE FROM otp_verification
        WHERE email = $1
        `,
        [email]
    );

    // Save new OTP (valid for 10 minutes)
    await db.query(
        `
        INSERT INTO otp_verification
        (
            email,
            otp,
            expires_at
        )
        VALUES
        (
            $1,
            $2,
            NOW() + INTERVAL '10 minutes'
        )
        `,
        [email, otp]
    );

};
const verifyOTP = async (email, otp) => {

    const result = await db.query(
        `
        SELECT *
        FROM otp_verification
        WHERE
            email = $1
            AND otp = $2
            AND expires_at > NOW()
        `,
        [email, otp]
    );

    return result.rows[0];

};
const deleteOTP = async (email) => {

    await db.query(
        `
        DELETE FROM otp_verification
        WHERE email = $1
        `,
        [email]
    );

};
module.exports = {
      createUser,
    findUserByEmail,
    saveOTP,
    verifyOTP,
    deleteOTP
}