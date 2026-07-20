const productRepository = require("../repositories/productrepository");

const getProduct = async (req , res) => {
    return await productRepository.getProducts();
};

const getProductById = async (id) => {
    const product = await productRepository.getProductById(id);

    if(!product) {
        throw new Error("Product not found");
    }
    return product;
};
const createProduct = async (data) => {
    return await productRepository.createProduct(
        data.sku,
        data.name,
        data.catrgory,
        data.reorder_threshold,
        data.product_type,
        data.organization_id,
        data.specs,
        data.purchase_price,
        data.selling_price
    );
};

module.exports = {
    getProduct,
    getProductById,
    createProduct,
};