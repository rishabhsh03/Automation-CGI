    const db = require("../models/db");

    const getDashboardData = async () => {

    const totalProducts = await db.query(`
        SELECT COUNT(*) FROM products
    `);

    const lowStock = await db.query(`
        SELECT COUNT(*)
        FROM inventory i
        JOIN products p
        ON i.product_id = p.id
        WHERE i.quantity <= p.reorder_threshold
    `);

    const totalOrders = await db.query(`
        SELECT COUNT(*) FROM orders
    `);
    const pendingOrders = await db.query(`
        SELECT COUNT(*)
        FROM orders
        WHERE status = 'PENDING'
    `);

    const processingOrders = await db.query(`
        SELECT COUNT(*)
        FROM orders
        WHERE status = 'PROCESSING'
    `);

    const shippedOrders = await db.query(`
        SELECT COUNT(*)
        FROM orders
        WHERE status = 'SHIPPED'
    `);

    const deliveredOrders = await db.query(`
        SELECT COUNT(*)
        FROM orders
        WHERE status = 'DELIVERED'
    `);

    const cancelledOrders = await db.query(`
        SELECT COUNT(*)
        FROM orders
        WHERE status = 'CANCELLED'
    `);

    const revenue = await db.query(`
        SELECT COALESCE(SUM(total_amount),0) AS revenue
        FROM orders
        WHERE status='DELIVERED'
    `);
    const totalSuppliers = await db.query(`
        SELECT COUNT(*) FROM suppliers
    `);

    const categories = await db.query(`
        SELECT category,
                COUNT(*) AS total
        FROM products
        GROUP BY category
        ORDER BY total DESC
    `);
const heatmap = await db.query(`
    WITH top_products AS (

        SELECT
            p.id,
            p.name,
            SUM(i.quantity) AS total_stock

        FROM inventory i

        JOIN products p
            ON p.id = i.product_id

        GROUP BY
            p.id,
            p.name

        ORDER BY
            total_stock DESC

        LIMIT 5

    )

    SELECT
        tp.name AS product,
        w.name AS warehouse,
        SUM(i.quantity) AS quantity

    FROM inventory i

    JOIN top_products tp
        ON tp.id = i.product_id

    JOIN locations l
        ON l.id = i.location_id

    JOIN warehouses w
        ON w.id = l.warehouse_id

    GROUP BY
        tp.name,
        w.name

    ORDER BY
        tp.name,
        w.name;
`);
const recentOrders = await db.query(`
    SELECT
        o.id,
        u.name AS customer_name,
        o.status,
        o.total_amount,
        o.created_at
    FROM orders o
    LEFT JOIN users u
        ON o.customer_id = u.id
    ORDER BY o.id DESC
    LIMIT 5;
`);

const purchaseOrders = await db.query(`
    SELECT COUNT(*)
    FROM purchaseorders;
`);
const inventoryCost = await db.query(`
    SELECT
        COALESCE(
            SUM(quantity * COALESCE(unit_cost, 0)),
            0
        ) AS inventory_cost
    FROM inventory;
`);
const inventorySellingValue = await db.query(`
    SELECT
        COALESCE(
            SUM(quantity * COALESCE(selling_price, 0)),
            0
        ) AS inventory_selling_value
    FROM inventory;
`);
const potentialProfit = Number(
    (
        Number(inventorySellingValue.rows[0].inventory_selling_value) -
        Number(inventoryCost.rows[0].inventory_cost)
    ).toFixed(2)
);
  return {
    summary: {

    totalProducts: Number(totalProducts.rows[0].count),

    lowStock: Number(lowStock.rows[0].count),

    totalOrders: Number(totalOrders.rows[0].count),

    totalSuppliers: Number(totalSuppliers.rows[0].count),

    pendingOrders: Number(pendingOrders.rows[0].count),

    processingOrders: Number(processingOrders.rows[0].count),

    shippedOrders: Number(shippedOrders.rows[0].count),

    deliveredOrders: Number(deliveredOrders.rows[0].count),

    cancelledOrders: Number(cancelledOrders.rows[0].count),

    revenue: Number(revenue.rows[0].revenue),

    inventoryCost: Number(
        inventoryCost.rows[0].inventory_cost
    ),

    inventorySellingValue: Number(
        inventorySellingValue.rows[0].inventory_selling_value
    ),

    potentialProfit,

    purchaseOrders: Number(
        purchaseOrders.rows[0].count
    )

},
    categories: categories.rows,
    heatmap: heatmap.rows,
    recentOrders: recentOrders.rows
};
};
    module.exports = {
    getDashboardData,
    };