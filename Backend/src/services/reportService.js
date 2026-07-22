const reportRepository =
require("../repositories/reportRepository");

const generateReport = async (filters) => {

    return await reportRepository.generateReport(filters);

};

module.exports = {

    generateReport

};