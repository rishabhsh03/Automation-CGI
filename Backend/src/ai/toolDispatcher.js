const INTENTS = require("./intents");
const inventoryTool = require("./tools/inventoryTool");

module.exports = {
    [INTENTS.LOW_STOCK]: inventoryTool,
    [INTENTS.OUT_OF_STOCK]: inventoryTool,
    [INTENTS.SEARCH_PRODUCT]: inventoryTool
};