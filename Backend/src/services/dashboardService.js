const dashboardRepository =
require("../repositories/dashboardRepository");

const getDashboardData = async () => {

    const data = await dashboardRepository.getDashboardData();

    return data;    
};
const getPurchaseSales = async () => {
    return await dashboardRepository.getPurchaseSales();
};
module.exports = {
    getDashboardData,
    getPurchaseSales,
};