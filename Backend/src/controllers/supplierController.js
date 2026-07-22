const supplierService = require("../services/supplierService");

/* ===========================
   Get All Suppliers
=========================== */

const getSuppliers = async (req, res) => {

    try {

        const data = await supplierService.getSuppliers();

        res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getSuppliers
};