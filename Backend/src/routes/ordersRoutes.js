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
router.get("/recent", getRecentOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);
module.exports= router;