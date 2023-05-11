const { productModel } = require('../models');

const findAllProducts = async () => {
    const allProducts = await productModel.findAllProducts();
    return { type: null, message: allProducts };
};

const findProductById = async (id) => {
    const product = await productModel.findProductById(id);
    if (!product) {
        return { type: 'NOT_FOUND', message: 'Product not found' };
    }
    return { type: null, message: product };
};

module.exports = {
    findAllProducts,
    findProductById,
};