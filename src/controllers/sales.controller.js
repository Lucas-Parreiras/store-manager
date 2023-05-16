const OK = 200;
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

const getAllSales = async (req, res) => {
    const { message } = await saleProductService.getAllSales();
    return res.status(OK).json(message);
};

const saleById = async (req, res) => {
    const saleId = Number(req.params.id);
    const { type, message } = await saleProductService.saleById(saleId);
    if (type === 'NOT_FOUND') {
        return res.status(NOT_FOUND).json({ message });
    }
    return res.status(OK).json(message);
};

module.exports = {
    registerNewSale,
    getAllSales,
    saleById,
};