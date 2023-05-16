const connection = require('../db/connection');

const registerProductsFromNewSale = async (saleBody, saleId) => {
    await connection.execute(
        `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
        VALUES (${saleId}, ${saleBody.productId}, ${saleBody.quantity})`,
    );
};

module.exports = {
    registerProductsFromNewSale,
};