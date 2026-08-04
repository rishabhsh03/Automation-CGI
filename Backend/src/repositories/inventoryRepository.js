const db = require("../models/db");

const getInventory = async () => {

    console.time("getInventory DB query");

    const result = await db.query(`
        SELECT
            i.id,

            p.id AS product_id,
            p.sku,
            p.name,
            p.category,

            w.name AS warehouse,

            l.asile,
            l.rack,
            l.bin,

            i.quantity,
            i.reserved_quantity,
            i.damaged_quantity,

            (
                i.quantity
                - COALESCE(i.reserved_quantity, 0)
                - COALESCE(i.damaged_quantity, 0)
            ) AS available_quantity,

            i.reorder_level,
            i.reorder_quantity,
            i.unit_cost,
            i.selling_price,
            i.status

        FROM inventory i

        JOIN products p
            ON p.id = i.product_id

        JOIN locations l
            ON l.id = i.location_id

        JOIN warehouses w
            ON w.id = l.warehouse_id

        ORDER BY p.name;
    `);

    console.timeEnd("getInventory DB query");

    return result.rows;
};

const addInventory = async (
    product_id,
    location_id,
    quantity,
    reserved_quantity,
    damaged_quantity,
    reorder_level,
    reorder_quantity,
    unit_cost,
    selling_price,
    status,
    organization_id
) => {

    const result = await db.query(`
        INSERT INTO inventory (

            product_id,

            location_id,

            quantity,

            reserved_quantity,

            damaged_quantity,

            reorder_level,

            reorder_quantity,

            unit_cost,

            selling_price,

            status,

            organization_id

        )

        VALUES (

            $1,$2,$3,$4,$5,

            $6,$7,$8,$9,$10,$11

        )

        RETURNING *;
    `,
    [

        product_id,

        location_id,

        quantity,

        reserved_quantity,

        damaged_quantity,

        reorder_level,

        reorder_quantity,

        unit_cost,

        selling_price,

        status,

        organization_id

    ]);

    return result.rows[0];

};
const updateInventory = async (

    id,

    quantity,

    reserved_quantity,

    damaged_quantity,

    reorder_level,

    reorder_quantity,

    unit_cost,

    selling_price,

    status

) => {

    const result = await db.query(`

        UPDATE inventory

        SET

            quantity = $1,

            reserved_quantity = $2,

            damaged_quantity = $3,

            reorder_level = $4,

            reorder_quantity = $5,

            unit_cost = $6,

            selling_price = $7,

            status = $8

        WHERE id = $9

        RETURNING *;

    `,
    [

        quantity,

        reserved_quantity,

        damaged_quantity,

        reorder_level,

        reorder_quantity,

        unit_cost,

        selling_price,

        status,

        id

    ]);

    return result.rows[0];

};
const getLowStockProducts = async () => {

    const result = await db.query(`
        SELECT

            i.id,

            p.id AS product_id,

            p.sku,

            p.name,

            p.category,

            i.quantity,

            i.reorder_level,

            i.reorder_quantity,

            (
                i.quantity
                - i.reserved_quantity
                - i.damaged_quantity
            ) AS available_quantity

        FROM inventory i

        JOIN products p
            ON p.id = i.product_id

        WHERE (
            i.quantity
            - i.reserved_quantity
            - i.damaged_quantity
        ) <= i.reorder_level

        ORDER BY available_quantity ASC;
    `);

    return result.rows;
};
const searchProduct = async (product) => {

    const result = await db.query(`
        SELECT
            i.id,
            p.sku,
            p.name,
            p.category,
            i.quantity,
            i.reserved_quantity,
            i.damaged_quantity,
            (
                i.quantity
                - COALESCE(i.reserved_quantity, 0)
                - COALESCE(i.damaged_quantity, 0)
            ) AS available_quantity,
            i.reorder_level,
            i.reorder_quantity
        FROM inventory i
        JOIN products p
        ON p.id = i.product_id
        WHERE
            LOWER(p.name) LIKE LOWER($1)
            OR LOWER(p.sku) LIKE LOWER($1)
        ORDER BY p.name;
    `, [`%${product}%`]);

    return result.rows;
};
const getOutOfStockProducts = async () => {

    const result = await db.query(`
        SELECT
            i.id,
            p.id AS product_id,
            p.sku,
            p.name,
            p.category,

            i.quantity,
            i.reserved_quantity,
            i.damaged_quantity,

            (
                i.quantity
                - COALESCE(i.reserved_quantity, 0)
                - COALESCE(i.damaged_quantity, 0)
            ) AS available_quantity,

            i.reorder_level,
            i.reorder_quantity

        FROM inventory i

        JOIN products p
            ON p.id = i.product_id

        WHERE (
            i.quantity
            - COALESCE(i.reserved_quantity, 0)
            - COALESCE(i.damaged_quantity, 0)
        ) <= 0

        ORDER BY p.name;
    `);

    return result.rows;
};
const getInventoryByCategory = async (category) => {

    const result = await db.query(`
        SELECT
            i.id,

            p.id AS product_id,
            p.sku,
            p.name,
            p.category,

            i.quantity,
            i.reserved_quantity,
            i.damaged_quantity,

            (
                i.quantity
                - COALESCE(i.reserved_quantity, 0)
                - COALESCE(i.damaged_quantity, 0)
            ) AS available_quantity,

            i.reorder_level,
            i.reorder_quantity,
            i.unit_cost,
            i.selling_price,
            i.status

        FROM inventory i

        JOIN products p
            ON p.id = i.product_id

        WHERE LOWER(p.category) = LOWER($1)

        ORDER BY p.name;
    `, [category]);

    return result.rows;

};
module.exports = {
    getInventory,
    addInventory,
    updateInventory,
    getLowStockProducts,
    getOutOfStockProducts,
    getInventoryByCategory,
    searchProduct
};
