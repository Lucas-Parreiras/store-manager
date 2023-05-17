const OK = 200;
const CREATED = 201;
const NOT_FOUND = 404;

const { productService } = require('../services');

const listProducts = async (req, res) => {
    const { message } = await productService.findAllProducts();
    res.status(OK).json(message);
};

const productById = async (req, res) => {
    const id = Number(req.params.id);
    const { type, message } = await productService.findProductById(id);
    if (type === 'NOT_FOUND') {
        return res.status(NOT_FOUND).json({ message });
    }
    return res.status(OK).json(message);
};

const addNewProduct = async (req, res) => {
    const { name } = req.body;
    const { message } = await productService.addNewProduct(name);

    res.status(CREATED).json(message);
};

const updateProductById = async (req, res) => {
    const { name } = req.body;
    const id = Number(req.params.id);
    const { type, message } = await productService.updateProductById(name, id);
    if (type === 'NOT_FOUND') {
        return res.status(NOT_FOUND).json({ message });
    }

    return res.status(OK).json(message);
};

module.exports = {
    listProducts,
    productById,
    addNewProduct,
    updateProductById,
};