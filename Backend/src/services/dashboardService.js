const dashboardRepository =
require("../repositories/dashboardRepository");

const getDashboardData = async () => {

    const data = await dashboardRepository.getDashboardData();

    return data;    
};

module.exports = {
    getDashboardData,
};