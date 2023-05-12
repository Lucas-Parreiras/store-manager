const { salesProductsModel } = require('../models');

const registerNewProductSale = async (saleBody) => {
    const saleLog = await salesProductsModel.registerProductsFromNewSale(saleBody);
    return { type: null, message: saleLog };
};

module.exports = {
    registerNewProductSale,
};