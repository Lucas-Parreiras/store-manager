const connection = require('../db/connection');
const { registerNewSale } = require('./sales.model');

const registerProductsFromNewSale = async (saleBody) => {
    const saleId = await registerNewSale();
    const saleProductList = saleBody;
    saleProductList.map(async (product) => {
        await connection.execute(
            `INSERT INTO sales_product (sale_id, product_id, quantity)
            VALUES (${saleId}, ${product.productId}, ${product.quantity})`,
        );
    });
    return {
        id: saleId,
        itemsSold: saleBody,
    };
}; 

module.exports = {
    registerProductsFromNewSale,
};