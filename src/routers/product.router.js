const express = require('express');

const { productController } = require('../controllers');

const { validateName } = require('../middlewares/productsValidation');

const router = express.Router();

router.post('/', validateName, productController.addNewProduct);

router.get('/:id', productController.productById);

router.get('/', productController.listProducts);

module.exports = router;