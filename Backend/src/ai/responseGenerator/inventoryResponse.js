class inventoryResponse {
    lowStock(data){
        if(!data.length){
            return{
                title:"Low Stock Report",
                message: "Great! No product are currently below the reorder level."
            };
        }

        const lines = data.map(product => {
            return `${product.name}
        Available : ${product.available_quantity}
        Reorder level : ${product.reorder_level}`;
        });
        return{
            title: "Low Stock Report",
            message:
                `I found ${data.length} low-stock product(s).\n\n` +
                lines.join("\n\n") +
                "\n\nRecommendation: Create a purchase order soon."
        };
    }
    outOfSock(data){
        if(!data.length){
            return{
                title:"Out of Stock",
                message:
                    "Excellent! No product are outof stock"
            };
        }
        const lines = data.map(product => {
            return ` ${product.name}`;
        });
        return{
            title:"Out of Stock",
            message:
                `${data.length} product(s) are currently unavailable.\n\n` +
                lines.join("\n")
        };
    }
}

module.exports = new inventoryResponse();