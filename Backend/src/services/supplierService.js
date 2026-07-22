const supplierRepository =  require("../repositories/supplierRepository");

const getSuppliers = async () => {
    return await supplierRepository.getSuppliers();
};

module.exports = {
    getSuppliers
}