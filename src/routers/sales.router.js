const express = require('express');

const { salesController } = require('../controllers');
const { 
    validateProductsQuantity,
    validateProductsIds,
 } = require('../middlewares/newSaleValidation');

const router = express.Router();

router.post(
    '/',
    validateProductsIds,
    validateProductsQuantity,
    salesController.registerNewSale,
);

module.exports = router;