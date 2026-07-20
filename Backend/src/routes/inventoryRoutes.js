const express = require("express");
const router = express.Router();

console.log("Inventory Routes Loaded");

router.post("/", (req, res, next) => {
    console.log("POST /api/inventory HIT");
    next();
});

const {
    getInventory,
    addInventory,
    updateInventory,
} = require("../controllers/inventoryController");

router.get("/", getInventory);
router.post("/", addInventory);
router.put("/:id", updateInventory);
module.exports = router;