const dashboardService =
    require("../../services/dashboardService");

const INTENTS =
    require("../intents");


class DashboardTool {

    constructor() {

        this.intentHandlers = {

            [INTENTS.DASHBOARD]:
                this.getDashboard.bind(this),

            [INTENTS.REVENUE]:
                this.getRevenue.bind(this)

        };

    }


    // ==========================================
    // EXECUTE
    // ==========================================

    async execute(analysis) {

        const handler =
            this.intentHandlers[
                analysis.intent
            ];

        if (!handler) {

            return {

                success: false,

                tool: "DASHBOARD",

                message:
                    `Unsupported dashboard intent: ${analysis.intent}`

            };

        }

        return await handler(analysis);

    }


    // ==========================================
    // DASHBOARD SUMMARY
    // ==========================================

    async getDashboard() {

        const data =
            await dashboardService
                .getDashboardData();

        return {

            success: true,

            tool: "DASHBOARD",

            action: INTENTS.DASHBOARD,

            data

        };

    }


    // ==========================================
    // REVENUE
    // ==========================================

    async getRevenue() {

        const dashboard =
            await dashboardService
                .getDashboardData();

        return {

            success: true,

            tool: "DASHBOARD",

            action: INTENTS.REVENUE,

            data: {

                revenue:
                    dashboard.summary.revenue

            }

        };

    }

}


module.exports =
    new DashboardTool();