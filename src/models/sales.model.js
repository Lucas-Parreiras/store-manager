const connection = require('../db/connection');

const registerNewSale = async () => {
    const [{ insertId }] = await connection.execute(
        'INSERT INTO sales () VALUES ()',
    );

    return insertId;
};

module.exports = {
    registerNewSale,
};