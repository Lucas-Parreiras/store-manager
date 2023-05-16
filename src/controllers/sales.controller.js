const CREATED = 201;
const NOT_FOUND = 404;

const { saleProductService } = require('../services');

const registerNewSale = async (req, res) => {
    const { type, message } = await saleProductService.registerNewProductSale(req.body);

    if (type === 'NOT_FOUND') {
        return res.status(NOT_FOUND).json({ message });
    }

    return res.status(CREATED).json(message);
};

module.exports = {
    registerNewSale,
};