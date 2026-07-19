const db = require("../models/db");
const { get } = require("../routes/dashBoardRoutes");

const getInventory = async () => {
const result = await db.query(`
SELECT
    p.id,
    p.sku,
    p.name,
    p.category,

    w.name AS warehouse,

    l.asile,
    l.rack,
    l.bin,

    i.quantity

FROM inventory i

JOIN products p
ON p.id = i.product_id

JOIN locations l
ON l.id = i.location_id

JOIN warehouses w
ON w.id = l.warehouse_id

ORDER BY p.name;
`);
return result.rows;

};

const addInventory = async (
        product_id,
        location_id,
        quantity,
        organization_id,
) => {
        const result = await db.query(`
            INSERT INTO inventory(
            product_id,
            location_id,
            quantity,
            organization_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,
            [product_id, location_id, quantity, organization_id]
        );
        return result.rows[0];
};
module.exports = {
    getInventory,
    addInventory,
};