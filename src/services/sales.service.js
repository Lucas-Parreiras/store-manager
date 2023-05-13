const { salesProductsModel } = require('../models');

const registerNewProductSale = async (saleBody) => {
    const saleList = saleBody;
    const quantityVerify = saleList.every((p) => p.quantity > 0);
    if (quantityVerify === false) {
        return {
            type: 'INVALID_VALUE',
            message: '"quantity" must be greater than or equal to 1',
        };
    }

    const newArrTypes = saleBody.map(async (p) => {
        const product = await salesProductsModel.findProductById(Number(p.productId));
        const { type } = product;
        return type;
    });

    const productIdValidation = newArrTypes.every((type) => type === null);

    if (productIdValidation === false) {
        return {
            type: 'NOT_FOUND',
            message: 'Product not found',
        };
    }

    const saleLog = await salesProductsModel.registerProductsFromNewSale(saleBody);
    return { type: null, message: saleLog };
};

module.exports = {
    registerNewProductSale,
};