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
    inventoryValue: inventoryValue.rows[0].inventory_value,
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

const generateReport = async (filters) => {

    switch (filters.reportType) {

        case "inventory":

            return await getInventoryReport();

        case "orders":

            return await getOrdersReport();

        case "sales":

            return await getSalesReport();

        case "purchase":

            return await getPurchaseReport();

        default:

            return [];

    }

};
const getInventoryReport = async () => {

    const result = await db.query(`
        SELECT
            i.id,
            p.name,
            w.name AS warehouse,
            i.quantity,
            i.status,
            i.updated_at

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
const getOrdersReport = async () => {

    const result = await db.query(`
        SELECT
            id,
            customer_name,
            total_amount,
            status,
            created_at

        FROM orders

        ORDER BY created_at DESC;
    `);

    return result.rows;

};
const getSalesReport = async () => {

    const result = await db.query(`
        SELECT

            TO_CHAR(created_at,'Mon YYYY') AS month,

            COUNT(*) AS total_orders,

            SUM(total_amount) AS revenue

        FROM orders

        WHERE status='DELIVERED'

        GROUP BY

            EXTRACT(YEAR FROM created_at),

            EXTRACT(MONTH FROM created_at),

            TO_CHAR(created_at,'Mon YYYY')

        ORDER BY

            EXTRACT(YEAR FROM created_at),

            EXTRACT(MONTH FROM created_at);
    `);

    return result.rows;

};
const getPurchaseReport = async () => {

    const result = await db.query(`
        SELECT

            po.id,

            s.name AS supplier,

            po.total_amount,

            po.status,

            po.created_at

        FROM purchaseorders po

        JOIN suppliers s
            ON s.id = po.supplier_id

        ORDER BY po.created_at DESC;
    `);

    return result.rows;

};
module.exports = {
  getReportSummary,
  getMonthlySales,
  generateReport,
};
