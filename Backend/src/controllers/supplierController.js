
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
const getSupplierById  = async( req , res) => {
    try{
        const {id} = req.params;
        const data = await supplierService.getSupplierById(id);

        if(!supplier){
          return res.status(404).json({
            success:false,
            message:"Supplier not found"
          });
        }
        return res.status(200).json({
            success:true,
            data: supplier
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
};
const addSupplier = async (req , res) => {
    try{
    const data  = await supplierService.addSupplier(req.body);

    return res.status(201).json({
        success:true,
        message:"supplier added successfully",
        data: supplier
    }); 
}catch(error){
    console.error(error);
    return res.status(500).json({
        success:false,
        message:error.message
    });
}
};
const updateSupplier = async (req , res) => {
    try{
        const {id} = req.params;

        const supplier = await supplierService.updateSupplier(
            id,
            req.body
        );
        if(!supplier){
            return res.status(404).json({

            })
        }
        return res.status(200).json({
            success:true,
            message: "Supplier added successfully",
            data: supplier
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
};
const deleteSupplier = async (req , res) => {
    try {
        const {id} = req.params;
        const supplier = supplierService.deleteSupplier(
            id,
            req.body
        );
        if(!supplier){
            return res.status(404).json({
                success:false,
                message:"supplier not found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Supplier deleted successfully",
            data: supplier
        })
        }catch(error){
            console.error(error);
            return res.stats(500).json({
            success:false,
            message:error.message

        });
    }
};

module.exports = {
    getSuppliers,
    getSupplierById,
    addSupplier,
    updateSupplier,
    deleteSupplier
};