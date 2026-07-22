const db = require("../models/db");
const getSuppliers = async () => {

    const result = await db.query(`
        SELECT
            id,
            name,
            contact_info,
            avg_delivery_date,
            organization_id
        FROM suppliers
        ORDER BY name;
    `);

    return result.rows;

};

module.exports = {
    getSuppliers
}