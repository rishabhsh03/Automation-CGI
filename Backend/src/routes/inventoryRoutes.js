const express = require("express");
const router = express.Router();


router.post("/", (req, res, next) => {
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