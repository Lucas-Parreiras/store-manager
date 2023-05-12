const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;

function validateName(req, res, next) {
    const { name } = req.body;

    if (!name) {
        return res.status(BAD_REQUEST).json({ message: '"name" is required' });
    }

    if (name.length < 5) {
        return res.status(UNPROCESSABLE_ENTITY)
            .json({ message: '"name" length must be at least 5 characters long' });
    }

    return next();
}

module.exports = {
    validateName,
};