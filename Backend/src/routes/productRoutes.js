const express = require("express");
const router = express.Router();

const {
    createProducts,
    getProducts,
    updateProducts,
    deleteProducts
} =require("../controllers/productController");

router.post("/create-product", createProducts);
router.get("/get-products", getProducts);
router.put("/update-products", updateProducts);
router.delete("/delete-products/:id", deleteProducts);

module.exports = router