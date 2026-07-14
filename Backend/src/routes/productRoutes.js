const express = require("express");
const router = express.Router();

const {
    saveProducts,
    getProducts,
    updateProducts,
    deleteProducts
} =require("../controllers/productController");

router.post("/save-products", saveProducts);
router.get("/get-products", getProducts);
router.put("/update-products", updateProducts);
router.delete("/delete-products/:id", deleteProducts);

module.exports = router