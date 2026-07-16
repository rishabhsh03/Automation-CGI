const dashboardService =
require("../services/dashboardService");

const getDashboard = async (req, res) => {

    try {

        const data =
            await dashboardService.getDashboardData();

        res.status(200).json({
            success: true,
            data,
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};

module.exports = {
    getDashboard,
};