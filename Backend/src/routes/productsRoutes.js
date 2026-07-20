const express = require("express");
const router = express.Router();

const {
    saveProducts,
    getProducts,
    updateProducts,
    deleteProducts
} =require("../controllers/productController");

router.post("/", saveProducts);
router.get("/", getProducts);
router.put("/:id", updateProducts);
router.delete("/:id", deleteProducts);

module.exports = router