const inventoryResponse =
    require("./inventoryResponse");

const INTENTS =
    require("../intents");

const orderResponse =
    require("./orderResponse");

const dashboardResponse =
    require("./dashboardResponse");
class ResponseGenerator {

    generate(result) {

        // ==========================================
        // ERROR
        // ==========================================

        if (!result.success) {

            return {

                title: "Error",

                message:
                    result.message ||
                    "Something went wrong."

            };

        }


        // ==========================================
        // RESPONSE ROUTING
        // ==========================================

        switch (result.action) {


            // --------------------------------------
            // AVAILABLE STOCK
            // --------------------------------------

            case INTENTS.AVAILABLE_STOCK:

                return inventoryResponse
                    .availableStock(
                        result.data,
                        result
                    );


            // --------------------------------------
            // LOW STOCK
            // --------------------------------------

            case INTENTS.LOW_STOCK:

                return inventoryResponse
                    .lowStock(
                        result.data
                    );


            // --------------------------------------
            // OUT OF STOCK
            // --------------------------------------

            case INTENTS.OUT_OF_STOCK:

                return inventoryResponse
                    .outOfStock(
                        result.data
                    );
            case INTENTS.SALES_ORDER:

                return orderResponse
                    .salesOrders(
                        result.data,
                        result
                    );

            case INTENTS.DASHBOARD:

                return dashboardResponse
                    .dashboard(result.data);


            case INTENTS.REVENUE:

                return dashboardResponse
                    .revenue(result.data);
            // --------------------------------------
            // FALLBACK
            // --------------------------------------

            default:

                return {

                    title: "Result",

                    message:
                        "The request was completed successfully."

                };

        }

    }

}


module.exports =
    new ResponseGenerator();