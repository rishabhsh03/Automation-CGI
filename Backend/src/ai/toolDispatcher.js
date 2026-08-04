const INTENTS = require("./intents");

const productTool = require("./tools/productTool");
const inventoryTool = require("./tools/inventoryTool");

class ToolDispatcher {

    constructor() {

        this.intentToolMap = {

            // ==========================
            // PRODUCT
            // ==========================

            [INTENTS.SEARCH_PRODUCT]: productTool,

            [INTENTS.GET_PRODUCT_PRICE]: productTool,

            [INTENTS.GET_PRODUCT_DETAILS]: productTool,


            // ==========================
            // INVENTORY
            // ==========================

            [INTENTS.INVENTORY]: inventoryTool,

            [INTENTS.AVAILABLE_STOCK]: inventoryTool,

            [INTENTS.LOW_STOCK]: inventoryTool,

            [INTENTS.OUT_OF_STOCK]: inventoryTool

        };

    }


    async dispatch(analysis) {

        if (!analysis) {

            return {
                success: false,
                message: "Analysis is required"
            };

        }


        if (!analysis.intent) {

            return {
                success: false,
                message: "Intent is required"
            };

        }


        const tool =
            this.intentToolMap[analysis.intent];


        if (!tool) {

            return {
                success: false,
                message: `No tool found for intent: ${analysis.intent}`
            };

        }


        try {

            console.log(
                `[ToolDispatcher] ${analysis.intent}`
            );

            return await tool.execute(analysis);

        } catch (error) {

            console.error(
                "[ToolDispatcher Error]",
                error
            );

            return {
                success: false,
                message: error.message
            };

        }

    }

}

module.exports = new ToolDispatcher();