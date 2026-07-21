const purchaseOrderRepository = require("../repositories/purchaseOrderRepository");

const createPurchaseOrder = async (req , res) => {
    try{
        const purchaseOrder = await purchaseOrderRepository.createPurchaseOrder(req.body);

        return res.status(201).json({
            success:true,
            message:"Purchase Order Created Successfully",
            data: purchaseOrder
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
// Get All Purchase Orders

const getPurchaseOrders = async (req , res) => {
    try{
        const puchaseOrders = await purchaseOrderRepository.getPurchaseOrder();

        return res.status(200).json({
            success:true,
            data: purchaseOrders
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:true,
            message:error.message
        });
    }
};

const getPurchaseOrderById = async (req , res) => {

    try{
        const {id} = db.params;
    const puchaseOrder = await purchaseOrderRepository.getPurchaseOrderById(id);

    if(!puchaseOrder){
        return res.status(404).json({
            success:true,
            message:"Puchase order not found"
        });
    }

    return res.status(200).json({
        success:true,
        data: puchaseOrder
    });
}catch(error){
    console.error(error);
    return res.status(500).json({
        success:false,
        message:error.message
        });
    }
};
const updatePurchaseOrderStatus = async (req , res) => {
    try{
        const {id} = req.params;
        const {status} = req.body;
        const puchaseOrder = await purchaseOrderRepository.updatePurchaseOrderStatus(id , status);
    
        if(!puchaseOrder) {
            return res.status(404).json({
                success: false,
                message:"Purchase order not found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Purchase order updated successfully",
            data:puchaseOrder
        });

    }catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            messgae:error.message
        });
    }
};
const cancelPurchaseOrder = async (req , res) => {
    try{
        const {id} = req.params;
        const puchaseOrder = await purchaseOrderRepository.cancelPurchaseOrder(id);
    
    if(!cancelPurchaseOrder){
        return res.status(404).json({
            success:false,
            message:"Purchase order not found"
        });
    }
    return res.status(200).json({
        success:true,
        message:"Purchase order canceld successfully",
        data: puchaseOrder
    });
}catch{
    console.error(error)
    return res.status(500).json({
        success:false,
        message:error.message
    });
}
};

module.exports = {
    createPurchaseOrder,
    getPurchaseOrders,
    getPurchaseOrderById,
    updatePurchaseOrderStatus,
    cancelPurchaseOrder
}
