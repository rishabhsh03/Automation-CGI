const inventoryService =
    require("../../services/inventoryService");

const INTENTS =
    require("../intents");


class InventoryTool {

    constructor() {

        this.intentHandlers = {

            [INTENTS.INVENTORY]:
                this.getInventory.bind(this),

            [INTENTS.AVAILABLE_STOCK]:
                this.getAvailableStock.bind(this),

            [INTENTS.LOW_STOCK]:
                this.getLowStock.bind(this),

            [INTENTS.OUT_OF_STOCK]:
                this.getOutOfStock.bind(this)

        };

    }


    // ==========================================
    // EXECUTE
    // ==========================================

    async execute(analysis) {

        const handler =
            this.intentHandlers[
                analysis.intent
            ];

        if (!handler) {

            return {

                success: false,

                tool: "INVENTORY",

                message:
                    `Unsupported inventory intent: ${analysis.intent}`

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
    // AVAILABLE STOCK
    // ==========================================

    async getAvailableStock(analysis) {

        const product =
            analysis.entities?.product;

        const category =
            analysis.entities?.category;


        // --------------------------------------
        // PRODUCT SPECIFIED
        // --------------------------------------

        if (product) {

            const data =
                await inventoryService.searchProduct(
                    product
                );

            return {

                success: true,

                tool: "INVENTORY",

                action: "AVAILABLE_STOCK",

                filter: "PRODUCT",

                data

            };

        }


        // --------------------------------------
        // CATEGORY SPECIFIED
        // --------------------------------------

        if (category) {

            const data =
                await inventoryService
                    .getInventoryByCategory(
                        category
                    );

            return {

                success: true,

                tool: "INVENTORY",

                action: "AVAILABLE_STOCK",

                filter: "CATEGORY",

                category,

                data

            };

        }


        // --------------------------------------
        // NO FILTER
        // --------------------------------------

        const data =
            await inventoryService.getInventory();

        return {

            success: true,

            tool: "INVENTORY",

            action: "AVAILABLE_STOCK",

            filter: "ALL",

            data

        };

    }


    // ==========================================
    // LOW STOCK
    // ==========================================

    async getLowStock() {

        const data =
            await inventoryService
                .getLowStockProducts();

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
            await inventoryService
                .getOutOfStockProducts();

        return {

            success: true,

            tool: "INVENTORY",

            action: "OUT_OF_STOCK",

            data

        };

    }

}


module.exports =
    new InventoryTool();