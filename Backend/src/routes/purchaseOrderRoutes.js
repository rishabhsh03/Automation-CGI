const express = require("express");
const router = express.Router() ;

const {
    createPurchaseOrder,
    getPurchaseOrders,
    getPurchaseOrderById,
    updatePurchaseOrderStatus,
    cancelPurchaseOrder
} = require("../controllers/purchaseOrderController");
console.log({
    createPurchaseOrder,
    getPurchaseOrders,
    getPurchaseOrderById,
    updatePurchaseOrderStatus,
    cancelPurchaseOrder
});
router.post("/", createPurchaseOrder);
router.get("/",getPurchaseOrders);
router.get("/:id",getPurchaseOrderById);
router.put("/:id",updatePurchaseOrderStatus);
router.patch("/:id/cancel",cancelPurchaseOrder);

module.exports = router;