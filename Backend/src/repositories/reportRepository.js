    const db = require("../models/db");

    const getReportSummary = async () => {

        const totalProducts = await db.query(`
            SELECT COUNT(*) AS total_products
            FROM products;
        `);

        const totalOrders = await db.query(`
            SELECT COUNT(*) AS total_orders
            FROM orders;
        `);

        const totalRevenue = await db.query(`
            SELECT COALESCE(SUM(total_amount),0) AS revenue
            FROM orders
            WHERE status = 'DELIVERED';
        `);

        const totalPurchaseOrders = await db.query(`
            SELECT COUNT(*) AS purchase_orders
            FROM purchaseorders;
        `);

        const lowStock = await db.query(`
            SELECT COUNT(*) AS low_stock
            FROM inventory
            WHERE available_quantity <= reorder_level;
        `);

        const inventoryValue = await db.query(`
            SELECT COALESCE(SUM(available_quantity * unit_cost),0) AS inventory_value
            FROM inventory;
        `);

        return {
            totalProducts: totalProducts.rows[0].total_products,
            totalOrders: totalOrders.rows[0].total_orders,
            revenue: totalRevenue.rows[0].revenue,
            purchaseOrders: totalPurchaseOrders.rows[0].purchase_orders,
            lowStock: lowStock.rows[0].low_stock,
            inventoryValue: inventoryValue.rows[0].inventory_value
        };
    };
    const getMonthlySales = async () => {

        const result = await db.query(`
            SELECT
                TO_CHAR(created_at,'Mon') AS month,
                COALESCE(SUM(total_amount),0) AS sales
            FROM orders
            GROUP BY
                EXTRACT(MONTH FROM created_at),
                TO_CHAR(created_at,'Mon')
            ORDER BY
                EXTRACT(MONTH FROM created_at);
        `);

        return result.rows;

    };

    module.exports = {
        getReportSummary,
        getMonthlySales,
    };