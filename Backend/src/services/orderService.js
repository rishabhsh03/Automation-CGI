const orderRepository = require("../repositories/orderRepository");

// ============================
// Create Order
// ============================

const createOrder = async (data) => {

    return await orderRepository.createOrder(data);

};

// ============================
// Get All Orders
// ============================

const getOrders = async () => {

    return await orderRepository.getOrders();

};

// ============================
// Get Order By ID
// ============================

const getOrderById = async (id) => {

    return await orderRepository.getOrderById(id);

};

// ============================
// Update Order Status
// ============================

const updateOrderStatus = async (id, status) => {

    return await orderRepository.updateOrderStatus(id, status);

};

// ============================
// Delete Order
// ============================

const deleteOrder = async (id) => {

    return await orderRepository.deleteOrder(id);

};

// ============================
// Recent Orders
// ============================

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