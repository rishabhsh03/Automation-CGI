const express = require("express");
const router = express.Router();

const  {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    getRecentOrders,
} = require("../controllers/orderController");


router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);
router.get("/recent", getRecentOrders);
module.exports= router;