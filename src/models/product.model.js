const camelize = require('camelize');
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

const updateProductById = async (newName, id) => {
    await connection.execute(
        'UPDATE StoreManager.products SET name = ? WHERE id = ?',
        [newName, id],
    );
    return {
        id,
        name: newName,
    };
};

const deleteProductById = async (id) => {
    await connection.execute(
        'DELETE FROM StoreManager.products WHERE id = ?',
        [id],
    );
};

const searchProduct = async (q) => {
    const [products] = await connection.execute(
        'SELECT * FROM StoreManager.products WHERE name LIKE ?;',
        [`%${q}%`],
    );
    return camelize(products);
};

module.exports = {
    findAllProducts,
    findProductById,
    addNewProduct,
    updateProductById,
    deleteProductById,
    searchProduct,
};