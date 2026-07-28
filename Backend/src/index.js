const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRoutes"));
router.use("/dashboard", require("./dashboardRoutes"));
router.use("/inventory", require("./inventoryRoutes"));
router.use("/orders", require("./ordersRoutes"));
router.use("/products", require("./productsRoutes"));
router.use("/purchase-orders", require("./purchaseOrderRoutes"));
router.use("/user", require("./userRoutes"));
router.use("/suppliers", require("./supplierRoutes"));
router.use("/report", require("./reportRoutes"));

module.exports = router;