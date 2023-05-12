const express = require('express');

const { salesController } = require('../controllers');
const { 
    validatePositiveQuantity,
    validateProductsQuantity,
    validateProductsIds,
 } = require('../middlewares/newSaleValidation');

const router = express.Router();

router.post(
    '/',
    validateProductsIds,
    validateProductsQuantity,
    validatePositiveQuantity,
    salesController.registerNewSale,
);

module.exports = router;