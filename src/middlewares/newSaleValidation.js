const BAD_REQUEST = 400;

function validateProductsIds(req, res, next) {
    const list = req.body;
    const idsIsValid = list
        .every((p) => p.hasOwnProperty('productId'));

    if (idsIsValid === false) {
        return res.status(BAD_REQUEST)
            .json({ message: '"productId" is required' });
    }

    return next();
}

function validateProductsQuantity(req, res, next) {
    const list = req.body;
    const quantityIdValid = list
        .every((p) => p.hasOwnProperty('quantity'));
       
    if (quantityIdValid === false) {
        return res.status(BAD_REQUEST)
            .json({ message: '"quantity" is required' });
    }

    return next();
}

module.exports = {
    validateProductsIds,
    validateProductsQuantity,
};
