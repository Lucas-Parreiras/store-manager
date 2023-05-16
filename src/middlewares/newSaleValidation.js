const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;

const notExist = (data) => data === null || data === undefined;

function validateProductsIds(req, res, next) {
    const list = req.body;
    const idsIsValid = list.find((p) => notExist(p.productId));

    if (idsIsValid) {
        return res.status(BAD_REQUEST)
            .json({ message: '"productId" is required' });
    }

    return next();
}

function validateProductsQuantity(req, res, next) {
    const list = req.body;
    const quantityIsValid = list.find((p) => notExist(p.quantity));
       
    if (quantityIsValid) {
        return res.status(BAD_REQUEST)
            .json({ message: '"quantity" is required' });
    }

    return next();
}

function positiveQuantity(req, res, next) {
    const list = req.body;
    const positiveValid = list
        .every((p) => Number(p.quantity) > 0);

    if (positiveValid === false) {
        return res.status(UNPROCESSABLE_ENTITY)
            .json({ message: '"quantity" must be greater than or equal to 1' });
    }

    return next();
}

module.exports = {
    validateProductsIds,
    validateProductsQuantity,
    positiveQuantity,
};
