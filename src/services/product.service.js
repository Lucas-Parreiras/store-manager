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

const addNewProduct = async (body) => {
    const newProductId = await productModel.addNewProduct(body);
    const newProduct = await productModel.findProductById(newProductId);

    return { type: null, message: newProduct };
};

const updateProductById = async (newName, id) => {
    const allProducts = await productModel.findAllProducts();
    const idIsValid = allProducts.find((p) => p.id === id);
    if (!idIsValid) {
        return { type: 'NOT_FOUND', message: 'Product not found' };
    }

    const updatedProduct = await productModel.updateProductById(newName, id);
    return { type: null, message: updatedProduct };
};

const deleteProductById = async (id) => {
    const allProducts = await productModel.findAllProducts();
    const idIsValid = allProducts.find((p) => p.id === id);
    if (!idIsValid) {
        return { type: 'NOT_FOUND', message: 'Product not found' };
    }
    await productModel.deleteProductById(id);
    return { type: null, message: 'Deleted' };
};

const searchProduct = async (q) => {
    const products = await productModel.searchProduct(q);
    if (!products) {
        return { type: 'NOT_FOUND', message: [] };
    }

    return { type: null, message: products };
};

module.exports = {
    findAllProducts,
    findProductById,
    addNewProduct,
    updateProductById,
    deleteProductById,
    searchProduct,
};