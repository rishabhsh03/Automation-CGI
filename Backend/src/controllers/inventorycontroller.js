const inventoryService = require("../services/inventoryService");
const getInventory = async (req , res) => {
    try{
        const data = await inventoryService.getInventory();
        
        res.json({
            success:true,
            data,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};


module.exports = {
    getInventory,

};
