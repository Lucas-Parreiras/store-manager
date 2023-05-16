const connection = require('../db/connection');

const registerNewSale = async () => {
    const [{ insertId }] = await connection.execute(
        'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
    );

    return insertId;
};

module.exports = {
    registerNewSale,
};