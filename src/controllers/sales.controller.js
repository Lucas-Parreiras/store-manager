const CREATED = 201;

const { saleProductService } = require('../services');

const registerNewSale = async (req, res) => {
    const { message } = await saleProductService.registerNewProductSale(req.body);

    return res.status(CREATED).json(message);
};

module.exports = {
    registerNewSale,
};