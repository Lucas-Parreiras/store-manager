const { salesProductsModel, productModel, salesModel } = require('../models');

const registerNewProductSale = async (saleBody) => {
    const saleList = saleBody;
    const allProducts = await productModel.findAllProducts();
    const idsValid = saleList
        .every((p) => allProducts.some((ap) => p.productId === ap.id));
    if (!idsValid) {
        return { type: 'NOT_FOUND', message: 'Product not found' };
    }
    const saleId = await salesModel.registerNewSale();
    await Promise.all(
        saleBody
            .map((p) => salesProductsModel.registerProductsFromNewSale(p, saleId)),
    );
    return { type: null,
        message: {
            id: saleId,
            itemsSold: saleBody,
        },
    };
};

module.exports = {
    registerNewProductSale,
};