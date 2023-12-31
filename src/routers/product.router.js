const express = require('express');

const { productController } = require('../controllers');

const { validateName } = require('../middlewares/productsValidation');

const router = express.Router();

router.get('/search', productController.searchProduct);

router.get('/:id', productController.productById);

router.get('/', productController.listProducts);

router.post('/', validateName, productController.addNewProduct);

router.put('/:id', validateName, productController.updateProductById);

router.delete('/:id', productController.deleteProductById);

module.exports = router;