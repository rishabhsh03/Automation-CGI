const productRepository = require("../repositories/productRepository");

class ProductService {

    async getProducts() {
        return await productRepository.getProducts();
    }

    async getProductById(id) {

        const product = await productRepository.getProductById(id);

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }

    async createProduct(data) {

        return await productRepository.addProduct(
            data.sku,
            data.name,
            data.category,
            data.reorder_threshold,
            data.reorder_qty
        );

    }

    async searchProduct(keyword) {
        return await productRepository.searchProduct(keyword);
    }

    async getBySku(sku) {
        return await productRepository.getBySku(sku);
    }

    async getByCategory(category) {
        return await productRepository.getByCategory(category);
    }

}

module.exports = new ProductService();