const reportRepository = require("../repositories/reportRepository");

const getReportSummary = async () => {
    return await reportRepository.getReportSummary();
};

const getMonthlySales = async () => {
    return await reportRepository.getMonthlySales();
};

const generateReport = async (filters) => {
    return await reportRepository.generateReport(filters);
};

module.exports = {
    getReportSummary,
    getMonthlySales,
    generateReport
};