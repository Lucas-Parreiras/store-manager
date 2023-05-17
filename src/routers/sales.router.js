const express = require('express');

const { salesController } = require('../controllers');
const { 
    validateProductsQuantity,
    validateProductsIds,
    positiveQuantity,
 } = require('../middlewares/newSaleValidation');

const router = express.Router();

router.get('/:id', salesController.saleById);

router.get('/', salesController.getAllSales);

router.post(
    '/',
    validateProductsIds,
    validateProductsQuantity,
    positiveQuantity,
    salesController.registerNewSale,
);

router.delete('/:id', salesController.deleteSaleById);

module.exports = router;