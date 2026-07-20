const inventoryRepository = require("../repositories/inventoryRepository");

const getInventory = async () => {
    return await inventoryRepository.getInventory();
};

const addInventory = async (data) => {
    return await inventoryRepository.addInventory(
        data.product_id,
        data.location_id,
        data.quantity,
        data.organization_id
    );
};
const updateInventory = async (id, data) => {

    return await inventoryRepository.updateInventory(
        id,
        data.quantity
    );

};
module.exports = {
    getInventory,
    addInventory,
    updateInventory,
};