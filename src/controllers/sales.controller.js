const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
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

const deleteSaleById = async (req, res) => {
    const id = Number(req.params.id);
    const { type, message } = await saleProductService.deleteSaleById(id);
    if (type === 'NOT_FOUND') {
        return res.status(NOT_FOUND).json({ message });
    }

    return res.status(NO_CONTENT).end();
};

module.exports = {
    registerNewSale,
    getAllSales,
    saleById,
    deleteSaleById,
};