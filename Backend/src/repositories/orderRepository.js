const db = require("../models/db");

const createOrder = async (orderData) => {

    const client = await db.connect();

    try {

        await client.query("BEGIN");

        const {
            customer_name,
            organization_id,
            status,
            total_amount,
            items
        } = orderData;

        // Create Order
        const orderResult = await client.query(
            `
            INSERT INTO orders
            (
                customer_name,
                status,
                organization_id,
                total_amount
            )
            VALUES
            ($1,$2,$3,$4)
            RETURNING *;
            `,
            [
                customer_name,
                status,
                organization_id,
                total_amount
            ]
        );

        const order = orderResult.rows[0];

        // Insert Order Items
        for (const item of items) {

            await client.query(
                `
                INSERT INTO orderitems
                (
                    order_id,
                    product_id,
                    quantity,
                    unit_price,
                    total_price,
                    organization_id
                )
                VALUES
                ($1,$2,$3,$4,$5,$6);
                `,
                [
                    order.id,
                    item.product_id,
                    item.quantity,
                    item.unit_price,
                    item.total_price,
                    organization_id
                ]
            );

        }

        await client.query("COMMIT");

        return order;

    } catch (error) {

        await client.query("ROLLBACK");
        throw error;

    } finally {

        client.release();

    }

};

const getOrders = async () => {

    const result = await db.query(`

        SELECT

            id,

            customer_name,

            status,

            total_amount,

            created_at

        FROM orders

        ORDER BY id DESC;

    `);

    return result.rows;

};
const getOrderById = async (id) => {
       console.log("Repository: Searching", id);


    const result = await db.query(
        `
        SELECT *

        FROM orders

        WHERE id = $1;
        `,
        [id]
    );

    return result.rows[0];

};

const updateOrderStatus = async (id, status) => {

    const result = await db.query(
        `
        UPDATE orders

        SET status = $1

        WHERE id = $2

        RETURNING *;
        `,
        [status, id]
    );

    return result.rows[0];

};

const deleteOrder = async (id) => {

    const client = await db.connect();

    try {

        await client.query("BEGIN");

        await client.query(
            `
            DELETE FROM orderitems

            WHERE order_id = $1;
            `,
            [id]
        );

        const result = await client.query(
            `
            DELETE FROM orders

            WHERE id = $1

            RETURNING *;
            `,
            [id]
        );

        await client.query("COMMIT");

        return result.rows[0];

    } catch (error) {

        await client.query("ROLLBACK");
        throw error;

    } finally {

        client.release();

    }

};
const getRecentOrders = async () => {

    const result = await db.query(`
        SELECT
            id,
            customer_name,
            status,
            total_amount,
            created_at
        FROM orders
        ORDER BY id DESC
        LIMIT 5;
    `);

    return result.rows;

};

module.exports = {

    createOrder,

    getOrders,

    getOrderById,

    updateOrderStatus,

    deleteOrder,

    getRecentOrders 

};