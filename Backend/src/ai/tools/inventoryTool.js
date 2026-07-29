const invnetoryService = require("../../services/inventoryService");
const INTENTS = require("../intents");

class InventoryTool {

    async execute(analysis) {

        switch (analysis.intent) {

            case INTENTS.LOW_STOCK:
                return await inventoryService.getLowStockProducts();

            case INTENTS.OUT_OF_STOCK:
                return await inventoryService.getOutOfStockProducts();

            case INTENTS.SEARCH_PRODUCT:
                return await inventoryService.searchProduct(
                    analysis.entities.product
                );

            default:
                throw new Error(`Unsupported intent: ${analysis.intent}`);
        }
    }

}

module.exports = new InventoryTool();