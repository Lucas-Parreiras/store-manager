const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');

const { allProducts, newProduct } = require('../models/mocks/products.model.mock');

describe('Testando camada service de produtos', () => {
    it('Testa se recupera lista completa de produtos corretamente', async () => {
        sinon.stub(productModel, 'findAllProducts').resolves(allProducts);

        const result = await productService.findAllProducts();

        expect(result.type).to.be.equal(null);
        expect(result.message).to.be.deep.equal(allProducts);
    });

    it('Testa de recupera dados de um produto especifico por id', async () => {
        sinon.stub(productModel, 'findProductById').resolves(allProducts[0]);

        const result = await productService.findProductById(1);

        expect(result.type).to.be.equal(null);
        expect(result.message).to.be.deep.equal(allProducts[0]);
    });

    it('Testa se retorna um erro caso não exista produto com determinado id', async () => {
        sinon.stub(productModel, 'findProductById').resolves(undefined);

        const result = await productService.findProductById(1);

        expect(result.type).to.be.equal('NOT_FOUND');
        expect(result.message).to.be.equal('Product not found');
    });

    it('Testa se adicionar novo produto corretamente', async () => {
        sinon.stub(productModel, 'addNewProduct').resolves(1);
        sinon.stub(productModel, 'findProductById').resolves(allProducts[0]);

        const result = await productService.addNewProduct(newProduct);

        expect(result.type).to.be.equal(null);
        expect(result.message).to.be.deep.equal(allProducts[0]);
    });

    afterEach(() => {
        sinon.restore();
    });
});