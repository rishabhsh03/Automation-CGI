const express = require("express");
const router = express.Router();
const productRoutes = 
const {
    createRouter
} =require("../controller/productController");

router.post("/create-product", createProduct);

module.export = router;