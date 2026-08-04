class OrderResponse {

    // ==========================================
    // SALES ORDERS
    // ==========================================

    salesOrders(data, result = {}) {

        const orders =
            Array.isArray(data)
                ? data
                : [];

        const status =
            result.status || null;


        // --------------------------------------
        // NO ORDERS
        // --------------------------------------

        if (orders.length === 0) {

            if (status) {

                return {
                    title:
                        `${this.formatStatus(status)} Orders`,

                    message:
                        `No ${status.toLowerCase()} orders were found.`
                };

            }

            return {
                title: "Sales Orders",
                message:
                    "No sales orders were found."
            };

        }


        // --------------------------------------
        // STATUS FILTERED
        // --------------------------------------

        if (status) {

            return {
                title:
                    `${this.formatStatus(status)} Orders`,

                message:
                    `I found ${orders.length} ${status.toLowerCase()} order(s).`
            };

        }


        // --------------------------------------
        // ALL ORDERS
        // --------------------------------------

        return {
            title: "Sales Orders",
            message:
                `I found ${orders.length} sales order(s).`
        };

    }


    // ==========================================
    // FORMAT STATUS
    // ==========================================

    formatStatus(status) {

        if (!status) {
            return "";
        }

        return status
            .toLowerCase()
            .replace(
                /\b\w/g,
                char => char.toUpperCase()
            );

    }

}


module.exports =
    new OrderResponse();