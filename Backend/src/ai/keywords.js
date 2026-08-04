const INTENTS = require("./intents");

const KEYWORDS = {

    // ==========================================
    // PRODUCT
    // ==========================================

    [INTENTS.GET_PRODUCT_PRICE]: {
        keywords: [
            "price",
            "cost",
            "selling price",
            "how much",
            "product price"
        ]
    },

    [INTENTS.GET_PRODUCT_DETAILS]: {
        keywords: [
            "product details",
            "product detail",
            "details of",
            "information about",
            "product information",
            "tell me about"
        ]
    },

    [INTENTS.SEARCH_PRODUCT]: {
        keywords: [
            "find product",
            "search product",
            "find",
            "search",
            "look for",
            "product named"
        ]
    },


    // ==========================================
    // INVENTORY
    // ==========================================

    [INTENTS.OUT_OF_STOCK]: {
        keywords: [
            "out of stock",
            "out-of-stock",
            "zero stock",
            "no stock",
            "unavailable products"
        ]
    },

    [INTENTS.LOW_STOCK]: {
        keywords: [
            "low stock",
            "low-stock",
            "below reorder level",
            "reorder level",
            "running low",
            "almost out of stock"
        ]
    },

    [INTENTS.AVAILABLE_STOCK]: {
    keywords: [
        "available stock",
        "stock available",
        "stock of",
        "quantity available",
        "available quantity",
        "how many",
        "how much stock",

        // Natural stock queries
        "show stock",
        "check stock",
        "current stock",
        "stock level",
        "stock levels"
    ]
},

    [INTENTS.INVENTORY]: {
        keywords: [
            "inventory",
            "show inventory",
            "inventory list",
            "all inventory",
            "warehouse inventory"
        ]
    },

    [INTENTS.REVENUE]: {
    keywords: [
        "revenue",
        "total revenue",
        "sales revenue",
        "total sales",
        "sales amount",
        "revenue generated",
        "how much revenue"
    ]
},
    // ==========================================
    // SUPPLIER
    // ==========================================

    [INTENTS.SUPPLIER]: {
        keywords: [
            "supplier",
            "suppliers",
            "vendor",
            "vendors"
        ]
    },


    // ==========================================
    // PURCHASE ORDER
    // ==========================================

    [INTENTS.PURCHASE_ORDER]: {
        keywords: [
            "purchase order",
            "purchase orders",
            "po",
            "supplier order"
        ]
    },


    // ==========================================
    // SALES ORDER
    // ==========================================

    [INTENTS.SALES_ORDER]: {
        keywords: [
            "sales order",
            "sales orders",
            "customer order",
            "customer orders",
            "orders"
        ]
    },


    // ==========================================
    // DASHBOARD
    // ==========================================

    [INTENTS.DASHBOARD]: {
        keywords: [
            "dashboard",
            "summary",
            "overview",
            "warehouse summary",
            "business summary"
        ]
    },


    // ==========================================
    // CONVERSATION
    // ==========================================

    [INTENTS.GREETING]: {
        keywords: [
            "hello",
            "hi",
            "hey",
            "good morning",
            "good afternoon",
            "good evening"
        ]
    },

    [INTENTS.HELP]: {
        keywords: [
            "help",
            "what can you do",
            "commands",
            "how can you help"
        ]
    }

};

module.exports = KEYWORDS;