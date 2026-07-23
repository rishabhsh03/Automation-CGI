const dashboardService = require("../services/dashboardService");

const getDashboard = async (req, res) => {

    try {

        const data = await dashboardService.getDashboardData();

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {

    getDashboard

};