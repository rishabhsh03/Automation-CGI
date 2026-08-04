const orderService =
    require("../../services/orderService");

const INTENTS =
    require("../intents");


class OrderTool {

    // ==========================================
    // EXECUTE
    // ==========================================

    async execute(analysis) {

        if (
            analysis.intent !==
            INTENTS.SALES_ORDER
        ) {

            return {
                success: false,
                tool: "ORDER",
                message:
                    `Unsupported order intent: ${analysis.intent}`
            };

        }

        return await this.getOrders(analysis);

    }


    // ==========================================
    // GET ORDERS
    // ==========================================

    async getOrders(analysis) {

        const orders =
            await orderService.getOrders();

        const text =
            analysis.message
                ?.toLowerCase()
                .trim() || "";

        let status = null;


        // --------------------------------------
        // STATUS DETECTION
        // --------------------------------------


if (text.includes("pending")) {

    status = "PENDING";

} else if (
    text.includes("shipped") ||
    text.includes("shipping")
) {

    status = "SHIPPED";

} else if (
    text.includes("delivered") ||
    text.includes("delivery")
) {

    status = "DELIVERED";

} else if (
    text.includes("completed") ||
    text.includes("complete")
) {

    status = "COMPLETED";

} else if (
    text.includes("cancelled") ||
    text.includes("canceled")
) {

    status = "CANCELLED";

} else if (
    text.includes("processing")
) {

    status = "PROCESSING";

}

        // --------------------------------------
        // FILTER ORDERS
        // --------------------------------------

        let data = orders;

        if (status) {

    data = orders.filter(order => {

        if (!order.status) {
            return false;
        }

        return (
            order.status.toUpperCase() === status
        );

    });

}

        // --------------------------------------
        // RESULT
        // --------------------------------------

        return {

            success: true,

            tool: "ORDER",

            action: INTENTS.SALES_ORDER,

            filter:
                status
                    ? "STATUS"
                    : "ALL",

            status,

            data

        };

    }

}


module.exports =
    new OrderTool();