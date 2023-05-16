const connection = require('../db/connection');
const camelize = require('camelize');

const registerNewSale = async () => {
    const [{ insertId }] = await connection.execute(
        'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
    );

    return insertId;
};

const getAllSales = async () => {
    const allSales = await connection.execute(
        `SELECT sale_id, date, product_id, quantity FROM
            StoreManager.sales_products
        INNER JOIN
            StoreManager.sales
        ON sales_products.sale_id = sales.id
        ORDER BY sale_id, product_id`,
    );
    return camelize(allSales);
};

const getSaleById = async (id) => {
    const saleById = await connection.execute(
        `SELECT date, product_id, quantity FROM
            StoreManager.sales_products
        INNER JOIN StoreManager.sales
        ON sales_products.sale_id = sales.id
        WHERE sale_id = ${id}
        ORDER BY product_id`,
    );
    return camelize(saleById);
};

module.exports = {
    registerNewSale,
    getAllSales,
    getSaleById,
};