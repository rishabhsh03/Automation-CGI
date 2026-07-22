const inventoryRepository = require("../repositories/inventoryRepository");

const getInventory = async () => {
    return await inventoryRepository.getInventory();
};

const addInventory = async (data) => {

    return await inventoryRepository.addInventory(

        data.product_id,

        data.location_id,

        data.quantity,

        data.reserved_quantity || 0,

        data.damaged_quantity || 0,

        data.reorder_level,

        data.reorder_quantity,

        data.unit_cost,

        data.selling_price,

        data.status,

        data.organization_id

    );

};

const updateInventory = async (id, data) => {

    return await inventoryRepository.updateInventory(

        id,

        data.quantity,

        data.reserved_quantity || 0,

        data.damaged_quantity || 0,

        data.reorder_level,

        data.reorder_quantity,

        data.unit_cost,

        data.selling_price,

        data.status

    );

};

module.exports = {

    getInventory,

    addInventory,

    updateInventory

};