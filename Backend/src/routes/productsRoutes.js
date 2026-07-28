const express = require("express");
const router = express.Router();

const {
    saveProducts,
    getProducts,
    updateProducts,
    deleteProducts
} = require("../controllers/productController");

const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

// Any logged-in user
router.get(
    "/",
    authenticate,
    getProducts
);

// Only ADMIN and WAREHOUSE_MANAGER can add products
router.post(
    "/",
    authenticate,
    authorize("ADMIN", "WAREHOUSE_MANAGER"),
    saveProducts
);

// Only ADMIN and WAREHOUSE_MANAGER can update products
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "WAREHOUSE_MANAGER"),
    updateProducts
);

// Only ADMIN can delete products
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    deleteProducts
);

module.exports = router;