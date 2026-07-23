const orderService = require("../services/orderService");

const createOrder = async (req, res) => {

    try {

        const data = await orderService.createOrder(req.body);

        res.status(201).json({
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

     //GET order

const getOrders = async (req , res) => {
      console.log("===== GET /api/orders HIT =====");
    try{
        const orders = await orderService.getOrders();

        return res.status(200).json({
            success:true,
            data:orders
        });

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"INTERNAL SERVER ERROR"
        });
    }
};

  // get Order By ID

const getOrderById = async (req, res) => {
    
        console.log("Controller: getOrderById");

    try {

        const { id } = req.params;

                console.log("ID:", id);


        const order = await orderService.getOrderById(id);

                console.log("Order:", order);


        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        }

        return res.status(200).json({
            success: true,
            data: order
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const updateOrderStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { status } = req.body;

        const order = await orderService.updateOrderStatus(id, status);

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: order
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/* ============================
   Delete Order
============================ */

const deleteOrder = async (req, res) => {

    try {

        const { id } = req.params;

        const order = await orderService.deleteOrder(id);

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};
const getRecentOrders = async (req, res) => {

    try {

        const orders =
            await orderService.getRecentOrders();

        res.json({
            success: true,
            data: orders
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};
module.exports = {

    createOrder,

    getOrders,

    getOrderById,

    updateOrderStatus,

    deleteOrder,

    getRecentOrders

};