const orderRepository = require("../repositories/orderRepository");
   //Create Order
const createOrder = async (req , res) => {
    console.log("1. Request received");
    try {
         console.log("2. Calling repository");
        const order = await orderRepository.createOrder(req.body);
                console.log("3. Repository returned");

        return res.status(201).json({
            success:true,
            message:"Order created successfully",
            data:order
        });
    }catch(error){
        console.error(error);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

     //GET order

const getOrders = async (req , res) => {
      console.log("===== GET /api/orders HIT =====");
    try{
        const orders = await orderRepository.getOrders();

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


        const order = await orderRepository.getOrderById(id);

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

        const order = await orderRepository.updateOrderStatus(id, status);

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

        const order = await orderRepository.deleteOrder(id);

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

module.exports = {

    createOrder,

    getOrders,

    getOrderById,

    updateOrderStatus,

    deleteOrder

};