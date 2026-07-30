const productService = require("../../services/productService");
const INTENTS = require("../intents")

class ProductTool {
    async execute(analysis){
        switch(analysis.intent){
            case INTENTS.SEARCH_PRODUCT:
        
        switch(analysis.entities.type){
            case "sku":
                return await productService.getBySku(
                    analysis.entities.value
                );
            case "category":
                return await productService.getByCategory(
                    analysis.entities.value
                );
            }
            default:
                return await productService.searchProduct(
                    analysis.entities.value
                );
        }   
    }
}
module.exports = new ProductTool();