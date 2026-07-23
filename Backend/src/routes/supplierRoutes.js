const express = require("express");
const router = express.Router();

const {
    getSuppliers,
    getSupplierById,
    addSupplier,
    updateSupplier,
    deleteSupplier
} = require("../controllers/supplierController");

router.get("/", getSuppliers);

router.get("/:id", getSupplierById);

router.post("/", addSupplier);

router.put("/:id", updateSupplier);

router.delete("/:id", deleteSupplier);

module.exports = router;