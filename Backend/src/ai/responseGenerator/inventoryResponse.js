class InventoryResponse {

    // ==========================================
    // AVAILABLE STOCK
    // ==========================================

    availableStock(data, result = {}) {

        if (!data || !data.length) {

            const category =
                result.category?.toUpperCase();

            return {
                title: category
                    ? `${category} Stock`
                    : "Available Stock",

                message: category
                    ? `No ${category} products were found in inventory.`
                    : "No inventory records were found."
            };

        }

        const category =
            result.category?.toUpperCase();

        return {

            title: category
                ? `${category} Stock`
                : "Available Stock",

            message: category
                ? `I found ${data.length} ${category} inventory record(s).`
                : `I found ${data.length} inventory record(s).`

        };

    }


    // ==========================================
    // LOW STOCK
    // ==========================================

    lowStock(data) {

        if (!data || !data.length) {

            return {

                title: "Low Stock Report",

                message:
                    "Great! No products are currently below the reorder level."

            };

        }

        return {

            title: "Low Stock Report",

            message:
                `I found ${data.length} low-stock product(s). ` +
                "Consider creating a purchase order soon."

        };

    }


    // ==========================================
    // OUT OF STOCK
    // ==========================================

    outOfStock(data) {

        if (!data || !data.length) {

            return {

                title: "Out of Stock",

                message:
                    "No products are currently out of stock."

            };

        }

        return {

            title: "Out of Stock",

            message:
                `${data.length} product(s) are currently unavailable.`

        };

    }

}


module.exports =
    new InventoryResponse();