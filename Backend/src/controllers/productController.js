const db = require("../models/db");

require("dotenv").config();

const saveProducts = async (req, res) => {
    try {

        const products = Array.isArray(req.body)
            ? req.body
            : [req.body];

        const insertedProducts = [];

        for (const product of products) {

            const {
                sku,
                name,
                category,
                reorder_threshold,
                reorder_qty
            } = product;

            // Check duplicate SKU
            const existing = await db.query(
                `SELECT id FROM products WHERE sku = $1`,
                [sku]
            );

            if (existing.rows.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: `SKU ${sku} already exists`
                });
            }

            const result = await db.query(
                `
                INSERT INTO products
                (
                    sku,
                    name,
                    category,
                    reorder_threshold,
                    reorder_qty
                )
                VALUES ($1,$2,$3,$4,$5)
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

            insertedProducts.push(result.rows[0]);
        }

        res.status(201).json({
            success: true,
            message: "Products inserted successfully",
            data: insertedProducts
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};
const getProducts = async (req, res) => {
    try {

        const result = await db.query(`
            SELECT
                p.*,

                EXISTS (
                    SELECT 1
                    FROM inventory i
                    WHERE i.product_id = p.id
                ) AS in_inventory

            FROM products p

            ORDER BY p.id;
        `);

        return res.status(200).json({
            success: true,
            data: result.rows
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const updateProducts = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            sku,
            name,
            category,
            reorder_threshold,
            reorder_qty
        } = req.body;

        const result = await db.query(
            `
            UPDATE products
            SET
                sku=$1,
                name=$2,
                category=$3,
                reorder_threshold=$4,
                reorder_qty=$5
            WHERE id=$6
            RETURNING *;
            `,
            [
                sku,
                name,
                category,
                reorder_threshold,
                reorder_qty,
                id
            ]
        );

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};
const deleteProducts = async (req, res) => {
    try {

        console.log("DELETE ID:", req.params.id);

        const { id } = req.params;

        const result = await db.query(
            `
            DELETE FROM products
            WHERE id = $1
            RETURNING *;
            `,
            [id]
        );

        console.log(result);

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {

        console.error("DELETE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
module.exports = {
    saveProducts,
    getProducts,
    updateProducts,
    deleteProducts
}