const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;

function validateProductsIds(req, res, next) {
    const list = req.body;
    const idsIsValid = list
        .every((p) => p.productId !== null && p.productId !== undefined);

    if (idsIsValid === false) {
        return res.status(BAD_REQUEST)
            .json({ message: '"productId" is required' });
    }

    return next();
}

function validateProductsQuantity(req, res, next) {
    const list = req.body;
    const quantityIdValid = list
        .every((p) => p.quantity !== null && p.quantity !== undefined);
       
    if (quantityIdValid === false) {
        return res.status(BAD_REQUEST)
            .json({ message: '"quantity" is required' });
    }

    return next();
}

function validatePositiveQuantity(req, res, next) {
    const list = req.body;
    const quantityIsPositive = list
        .every((p) => p.quantity > 0);

    if (quantityIsPositive === false) {
        return res.status(UNPROCESSABLE_ENTITY)
            .json({ message: '"quantity" must be greater than or equal to 1' });
    }

    return next();
}

module.exports = {
    validateProductsIds,
    validateProductsQuantity,
    validatePositiveQuantity,
};
