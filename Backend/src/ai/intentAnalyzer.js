class IntentAnalyzer {

    constructor() {
        this.intentMap = {
            LOW_STOCK: [
                "low stock",
                "reorder",
                "below reorder",
                "reorder level",
                "restock"
            ],

            OUT_OF_STOCK: [
                "out of stock",
                "no stock",
                "stock finished"
            ],

            INVENTORY: [
                "inventory",
                "stock",
                "available quantity"
            ],

            SUPPLIER: [
                "supplier",
                "vendor"
            ],

            PURCHASE_ORDER: [
                "purchase order",
                "po"
            ],

            DASHBOARD: [
                "dashboard",
                "summary",
                "overview"
            ]
        };
    }

    analyze(prompt) {

        const text = prompt.toLowerCase();

        for (const [intent, keywords] of Object.entries(this.intentMap)) {

            if (keywords.some(keyword => text.includes(keyword))) {
                return{ 
                    intent,
                    confidence:1
                }
            }

        }

        return {
        intent: "GENERAL",
        confidence: 0
        }
    }

}

module.exports = new IntentAnalyzer();