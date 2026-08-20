const db = require("../models/db");

const getDashboardData = async () => {

    console.time("Dashboard total");

    const [
        productStats,
        orderStats,
        supplierStats,
        categories,
        heatmap,
        recentOrders,
        purchaseOrders,
        inventoryValues
    ] = await Promise.all([

        

        db.query(`
            SELECT
                (SELECT COUNT(*) FROM products) AS total_products,

                (
                    SELECT COUNT(*)
                    FROM inventory i
                    JOIN products p
                        ON p.id = i.product_id
                    WHERE i.quantity <= p.reorder_threshold
                ) AS low_stock;
        `),


        db.query(`
            SELECT
                COUNT(*) AS total_orders,

                COUNT(*) FILTER (
                    WHERE status = 'PENDING'
                ) AS pending_orders,

                COUNT(*) FILTER (
                    WHERE status = 'PROCESSING'
                ) AS processing_orders,

                COUNT(*) FILTER (
                    WHERE status = 'SHIPPED'
                ) AS shipped_orders,

                COUNT(*) FILTER (
                    WHERE status = 'DELIVERED'
                ) AS delivered_orders,

                COUNT(*) FILTER (
                    WHERE status = 'CANCELLED'
                ) AS cancelled_orders,

                COALESCE(
                    SUM(total_amount) FILTER (
                        WHERE status = 'DELIVERED'
                    ),
                    0
                ) AS revenue

            FROM orders;
        `),



        db.query(`
            SELECT COUNT(*) AS total_suppliers
            FROM suppliers;
        `),

        db.query(`
            SELECT
                category,
                COUNT(*) AS total
            FROM products
            GROUP BY category
            ORDER BY total DESC;
        `),

        db.query(`
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

                ORDER BY total_stock DESC

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
        `),


        db.query(`
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
        `),


        db.query(`
            SELECT COUNT(*) AS purchase_orders
            FROM purchaseorders;
        `),

        db.query(`
            SELECT

                COALESCE(
                    SUM(
                        quantity *
                        COALESCE(unit_cost, 0)
                    ),
                    0
                ) AS inventory_cost,

                COALESCE(
                    SUM(
                        quantity *
                        COALESCE(selling_price, 0)
                    ),
                    0
                ) AS inventory_selling_value

            FROM inventory;
        `)
    ]);

    console.timeEnd("Dashboard total");



    const products = productStats.rows[0];

    const orders = orderStats.rows[0];

    const suppliers = supplierStats.rows[0];

    const inventory = inventoryValues.rows[0];

    const inventoryCost =
        Number(inventory.inventory_cost);

    const inventorySellingValue =
        Number(inventory.inventory_selling_value);

    const potentialProfit =
        Number(
            (
                inventorySellingValue -
                inventoryCost
            ).toFixed(2)
        );

  

    return {

        summary: {

            totalProducts:
                Number(products.total_products),

            lowStock:
                Number(products.low_stock),

            totalOrders:
                Number(orders.total_orders),

            totalSuppliers:
                Number(suppliers.total_suppliers),

            pendingOrders:
                Number(orders.pending_orders),

            processingOrders:
                Number(orders.processing_orders),

            shippedOrders:
                Number(orders.shipped_orders),

            deliveredOrders:
                Number(orders.delivered_orders),

            cancelledOrders:
                Number(orders.cancelled_orders),

            revenue:
                Number(orders.revenue),

            inventoryCost,

            inventorySellingValue,

            potentialProfit,

            purchaseOrders:
                Number(
                    purchaseOrders.rows[0].purchase_orders
                )
        },

        categories:
            categories.rows,

        heatmap:
            heatmap.rows,

        recentOrders:
            recentOrders.rows
    };
};

module.exports = {
    getDashboardData
};

