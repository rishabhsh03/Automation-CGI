const inventoryRepository = require("../repositories/inventoryRepository");

const getInventory = async () => {

    const inventory = await inventoryRepository.getInventory();

    if (inventory.length === 0) {
        throw new Error("Inventory is empty");
    }

    return inventory;
};

module.exports = {
    getInventory,
};