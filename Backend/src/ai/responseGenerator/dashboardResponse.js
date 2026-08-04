class DashboardResponse {

    // ==========================================
    // DASHBOARD SUMMARY
    // ==========================================

    dashboard(data) {

        if (!data || !data.summary) {

            return {
                title: "Dashboard Summary",
                message:
                    "Dashboard information is currently unavailable."
            };

        }

        const summary = data.summary;

        return {

            title: "Dashboard Summary",

            message:
                `Warehouse overview:\n\n` +
                `Products: ${summary.totalProducts}\n` +
                `Orders: ${summary.totalOrders}\n` +
                `Pending Orders: ${summary.pendingOrders}\n` +
                `Processing Orders: ${summary.processingOrders}\n` +
                `Shipped Orders: ${summary.shippedOrders}\n` +
                `Delivered Orders: ${summary.deliveredOrders}\n` +
                `Cancelled Orders: ${summary.cancelledOrders}\n` +
                `Low Stock: ${summary.lowStock}\n` +
                `Suppliers: ${summary.totalSuppliers}`

        };

    }


    // ==========================================
    // REVENUE
    // ==========================================

    revenue(data) {

        const revenue =
            Number(data?.revenue || 0);

        const formattedRevenue =
            new Intl.NumberFormat(
                "en-IN",
                {
                    style: "currency",
                    currency: "INR"
                }
            ).format(revenue);

        return {

            title: "Revenue",

            message:
                `Total revenue from delivered orders is ${formattedRevenue}.`

        };

    }

}


module.exports = new DashboardResponse();