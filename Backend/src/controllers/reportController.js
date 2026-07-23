const reportService = require("../services/reportService");

const getReportSummary = async (req, res) => {

    try {

        const data = await reportService.getReportSummary();

        return res.json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getMonthlySales = async (req, res) => {

    try {

        const data = await reportService.getMonthlySales();

        return res.json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const generateReport = async (req, res) => {

    try {

        const data = await reportService.generateReport(req.body);

        return res.json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getReportSummary,
    getMonthlySales,
    generateReport
};