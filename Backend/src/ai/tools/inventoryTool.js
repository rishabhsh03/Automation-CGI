const inventoryService = require("../../services/inventoryService");

class InventoryTool {

    async getLowStockProducts() {

        return await inventoryService.getLowStockProducts();

    }

}

module.exports = new InventoryTool();