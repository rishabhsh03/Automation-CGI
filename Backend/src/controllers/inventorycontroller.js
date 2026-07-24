const inventoryService = require("../services/inventoryService");
const getInventory = async (req , res) => {
    try{
        const data = await inventoryService.getInventory();
        //  console.log("BODY:", req.body);
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
const addInventory = async (req , res) => {
    try{
        // console.log("Controller HIT");
        // console.log(req.body);
        const data = await inventoryService.addInventory(req.body);

        res.status(201).json({
            success:true,
            data,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}
const updateInventory = async (req, res) => {
    try {

        // console.log("BODY:", req.body);
        // console.log("PARAMS:", req.params);

        const data = await inventoryService.updateInventory(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
module.exports = {
    getInventory,
    addInventory,
    updateInventory,

};
