const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('../db/connection');

const findAllProducts = async () => {
    const [allProducts] = await connection.execute(
        'SELECT * FROM StoreManager.products ORDER BY id',
    );
    return camelize(allProducts);
};

const findProductById = async (id) => {
    const [[product]] = await connection.execute(
        `SELECT * FROM StoreManager.products WHERE id = ${id}`,
    );
    return camelize(product);
};

const addNewProduct = async (body) => {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO products (name) VALUES (?)',
      [body],  
    );
    return insertId;
};

module.exports = {
    findAllProducts,
    findProductById,
    addNewProduct,
};