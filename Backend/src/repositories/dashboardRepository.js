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

},
    categories: categories.rows,

  };

};
const getPurchaseSales = async () => {
  const result = await db.query(`
    SELECT
            TO_CHAR(created_at,'Mon') AS month,

            SUM(CASE
                WHEN order_type = 'PURCHASE'
                THEN total_amount
                ELSE 0
            END) AS purchase,

            SUM(CASE
                WHEN order_type = 'SALE'
                THEN total_amount
                ELSE 0
            END) AS sales

        FROM orders

        GROUP BY month,
                 EXTRACT(MONTH FROM created_at)

        ORDER BY EXTRACT(MONTH FROM created_at);
    `);
    return result.rows;
}

module.exports = {
  getDashboardData,
  getPurchaseSales
};