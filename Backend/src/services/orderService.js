const orderRepository = require("../repositories/orderRepository");


const createOrder = async (data) => {

    return await orderRepository.createOrder(data);

};



const getOrders = async () => {

    return await orderRepository.getOrders();

};


const getOrderById = async (id) => {

    return await orderRepository.getOrderById(id);

};


const updateOrderStatus = async (id, status) => {

    return await orderRepository.updateOrderStatus(id, status);

};


const deleteOrder = async (id) => {

    return await orderRepository.deleteOrder(id);

};


const getRecentOrders = async () => {

    return await orderRepository.getRecentOrders();

};

module.exports = {

    createOrder,

    getOrders,

    getOrderById,

    updateOrderStatus,

    deleteOrder,

    getRecentOrders

};