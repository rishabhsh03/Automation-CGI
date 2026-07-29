const INTENTS = require("./intents");

module.exports = {

    [INTENTS.LOW_STOCK]: [
        "low stock",
        "reorder",
        "below reorder",
        "restock",
        "need reorder"
    ],

    [INTENTS.OUT_OF_STOCK]: [
        "out of stock",
        "stock finished",
        "no stock",
        "zero stock"
    ],

    [INTENTS.INVENTORY]: [
        "inventory",
        "stock",
        "available quantity"
    ],

    [INTENTS.SEARCH_PRODUCT]: [
        "find",
        "search",
        "locate",
        "show product",
        "product"
    ],

    [INTENTS.SUPPLIER]: [
        "supplier",
        "vendor"
    ],

    [INTENTS.PURCHASE_ORDER]: [
        "purchase order",
        "po"
    ],

    [INTENTS.DASHBOARD]: [
        "dashboard",
        "summary",
        "overview"
    ]

};