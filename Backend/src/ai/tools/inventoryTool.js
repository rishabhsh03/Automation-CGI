const inventoryService = require("../../services/inventoryService");
const INTENTS = require("../intents");

class InventoryTool {

    constructor() {

        this.intentHandlers = {

            [INTENTS.INVENTORY]:
                this.getInventory.bind(this),

            [INTENTS.AVAILABLE_STOCK]:
                this.searchProduct.bind(this),

            [INTENTS.LOW_STOCK]:
                this.getLowStock.bind(this),

            [INTENTS.OUT_OF_STOCK]:
                this.getOutOfStock.bind(this)

        };

    }

    async execute(analysis) {

        const handler =
            this.intentHandlers[analysis.intent];

        if (!handler) {

            return {
                success: false,
                tool: "INVENTORY",
                message: `Unsupported inventory intent: ${analysis.intent}`
            };
        }

        return await handler(analysis);
    }


    // ==========================================
    // ALL INVENTORY
    // ==========================================

    async getInventory() {

        const data =
            await inventoryService.getInventory();

        return {
            success: true,
            tool: "INVENTORY",
            action: "INVENTORY",
            data
        };
    }


    // ==========================================
    // AVAILABLE STOCK / PRODUCT SEARCH
    // ==========================================

    async searchProduct(analysis) {

        const product =
            analysis.entities?.product;

        if (!product) {

            return {
                success: false,
                tool: "INVENTORY",
                action: "AVAILABLE_STOCK",
                message: "Product name is required"
            };
        }

        const data =
            await inventoryService.searchProduct(product);

        return {
            success: true,
            tool: "INVENTORY",
            action: "AVAILABLE_STOCK",
            data
        };
    }


    // ==========================================
    // LOW STOCK
    // ==========================================

    async getLowStock() {

        const data =
            await inventoryService.getLowStockProducts();

        return {
            success: true,
            tool: "INVENTORY",
            action: "LOW_STOCK",
            data
        };
    }


    // ==========================================
    // OUT OF STOCK
    // ==========================================

    async getOutOfStock() {

        const data =
            await inventoryService.getOutOfStockProducts();

        return {
            success: true,
            tool: "INVENTORY",
            action: "OUT_OF_STOCK",
            data
        };
    }

}

module.exports = new InventoryTool();