const productService = require("../services/productService");
const INTENTS = require("./intents");

class ProductTool {

    constructor() {

        this.intentHandlers = {

            [INTENTS.SEARCH_PRODUCT]: this.searchProduct.bind(this),

            [INTENTS.GET_PRODUCT_PRICE]: this.getProductPrice.bind(this),

            [INTENTS.GET_PRODUCT_DETAILS]: this.getProductDetails.bind(this)

        };

    }

    async execute(analysis) {

        const handler = this.intentHandlers[analysis.intent];

        if (!handler) {

            return {
                success: false,
                tool: "PRODUCT",
                message: `Unsupported intent: ${analysis.intent}`
            };

        }

        return await handler(analysis);

    }

    // ---------------- SEARCH PRODUCT ----------------

    async searchProduct(analysis) {

        const { product, sku, category, barcode } = analysis.entities;

        let data;

        if (sku) {

            data = await productService.getBySku(sku);

        } else if (barcode) {

            data = await productService.getByBarcode(barcode);

        } else if (category) {

            data = await productService.getByCategory(category);

        } else {

            data = await productService.searchProduct(product);

        }

        return {

            success: true,

            tool: "PRODUCT",

            action: "SEARCH_PRODUCT",

            data

        };

    }

    // ---------------- PRODUCT PRICE ----------------

    async getProductPrice(analysis) {

        const data = await productService.getProductPrice(
            analysis.entities.product
        );

        return {

            success: true,

            tool: "PRODUCT",

            action: "GET_PRODUCT_PRICE",

            data

        };

    }

    // ---------------- PRODUCT DETAILS ----------------

    async getProductDetails(analysis) {

        const data = await productService.getProductDetails(
            analysis.entities.product
        );

        return {

            success: true,

            tool: "PRODUCT",

            action: "GET_PRODUCT_DETAILS",

            data

        };

    }

}

module.exports = new ProductTool();