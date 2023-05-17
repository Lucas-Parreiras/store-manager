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

const getAllSales = async () => {
    const [allSales] = await salesModel.getAllSales();
    return { type: null, message: allSales };
};

const saleById = async (id) => {
    const [allSales] = await salesModel.getAllSales();
    const validId = allSales.find((p) => p.productId === id);
    if (!validId) {
        return { type: 'NOT_FOUND', message: 'Sale not found' };
    }
    const [sales] = await salesModel.getSaleById(id);
    return { type: null, message: sales };
};

const deleteSaleById = async (id) => {
    const selectedSale = await salesModel.deleteSaleById(id);
    if (selectedSale === 0) {
        return { type: 'NOT_FOUND', message: 'Sale not found' };
    }

    return { type: null, message: 'Deleted' };
};

module.exports = {
    registerNewProductSale,
    getAllSales,
    saleById,
    deleteSaleById,
};