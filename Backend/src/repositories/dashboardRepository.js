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

      totalProducts:
        Number(totalProducts.rows[0].count),

      lowStock:
        Number(lowStock.rows[0].count),

      totalOrders:
        Number(totalOrders.rows[0].count),

      totalSuppliers:
        Number(totalSuppliers.rows[0].count),

    },

    categories: categories.rows,

  };

};

module.exports = {
  getDashboardData,
};