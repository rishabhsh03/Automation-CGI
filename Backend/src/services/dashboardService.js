const dashboardRepository = require("../repositories/dashboardRepository");

const getDashboardData = async () => {

    return await dashboardRepository.getDashboardData();

};

module.exports = {

    getDashboardData

};