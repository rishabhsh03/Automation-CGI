
const supplierRepository =  require("../repositories/supplierRepository");

const getSuppliers = async () => {
    return await supplierRepository.getSuppliers();
};
const getSupplierById = async () => {
    return await supplierRepository.getSupplierById(id);
}
const addSupplier = async (supplierData) => {
    return await supplierRepository.addSupplier(supplierData);
}
const updateSupplier = async (id , supplierData) => {
    return await supplierRepository.updateSupplier(id , supplierData);
}
const deleteSupplier = async (id) => {
    return await supplierRepository.deleteSuppliers(id);
}
module.exports = {
    getSuppliers,
    getSupplierById,
    addSupplier,
    updateSupplier,
    deleteSupplier,
}