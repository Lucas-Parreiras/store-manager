const express = require('express');

const { productController } = require('../controllers');

const router = express.Router();

router.post('/', productController.addNewProduct);

router.get('/:id', productController.productById);

router.get('/', productController.listProducts);

module.exports = router;