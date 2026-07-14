const express = require("express");
const router = express.Router();

const {
    createProducts,
    getProducts
} =require("../controllers/productController");

router.post("/product", createProducts);
router.get("/products", getProducts)
module.exports = router