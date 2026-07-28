const db = require("../models/db");

const getProducts = async () => {
const result = await db.query(`
    SELECT
        p.id,
        p.sku,
        p.name,
        p.category,
        i.selling_price,

        EXISTS (
            SELECT 1
            FROM inventory inv
            WHERE inv.product_id = p.id
        ) AS in_inventory

    FROM products p

    LEFT JOIN inventory i
    ON i.product_id = p.id

    ORDER BY p.id;
`);
    return result.rows;
}
const getProductById = async (id) => {
    const result = await db.query(
        `
        SELECT *
        FROM products
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};

const addProduct = async (
    sku,
    name,
    category,
    reorder_threshold,
    reorder_qty
) => {

    const result = await db.query(
        `
        INSERT INTO products(
            sku,
            name,
            category,
            reorder_threshold,
            reorder_qty
        )
        VALUES($1,$2,$3,$4,$5)
        RETURNING *;
        `,
        [
            sku,
            name,
            category,
            reorder_threshold,
            reorder_qty
        ]
    );

    return result.rows[0];
};


const deleteProduct = async (id) => {

    const result = await db.query(
        `
        DELETE FROM products
        WHERE id = $1
        RETURNING *;
        `,
        [id]
    );

    return result.rows[0];
};
const updateQuantity = (index, quantity) => {

    setOrderItems(prev =>
        prev.map((item, i) => {

            if (i !== index) return item;

            return {
                ...item,
                quantity,
                total_price:
                    quantity * Number(item.unit_price)
            };

        })
    );

};
module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    updateQuantity
};