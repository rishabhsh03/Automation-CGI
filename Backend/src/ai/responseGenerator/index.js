const inventoryResponse = require("./inventoryResponse");
const INTENTS = require("../intents");

class ResponseGenerator {

    generate(result) {

        if (!result.success) {

            return {
                title: "Error",
                message: result.message || "Something went wrong."
            };

        }

        switch (result.action) {

            case INTENTS.LOW_STOCK:
                return inventoryResponse.lowStock(result.data);

            case INTENTS.OUT_OF_STOCK:
                return inventoryResponse.outOfStock(result.data);

            default:

                return {

                    title: "Result",

                    message: JSON.stringify(
                        result.data,
                        null,
                        2
                    )

                };

        }

    }

}

module.exports = new ResponseGenerator();
