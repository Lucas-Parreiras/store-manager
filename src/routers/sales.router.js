const express = require('express');

const { salesController } = require('../controllers');
const { 
    validateProductsQuantity,
    validateProductsIds,
    positiveQuantity,
 } = require('../middlewares/newSaleValidation');

const router = express.Router();

router.post(
    '/',
    validateProductsIds,
    validateProductsQuantity,
    positiveQuantity,
    salesController.registerNewSale,
);

module.exports = router;