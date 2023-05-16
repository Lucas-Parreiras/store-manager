const { expect } = require('chai');
const sinon = require('sinon');
const { productService, saleProductService } = require('../../../src/services');
const { productModel } = require('../../../src/models');

const { allProducts, newProduct } = require('../models/mocks/products.model.mock');
const { allSales, saleId1, newSale, newInvalidIdSale, rightReturnNew } = require('../models/mocks/sales.mock');

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

describe('Testes da camada service de vendas', () => {
    it('Testa se recupera a lista completa de vendas corretamete', async () => {
        sinon.stub(saleProductService, 'getAllSales').resolves({
            type: null,
            message: allSales,
        });

        const result = await saleProductService.getAllSales();

        expect(result.type).to.be.equal(null);
        expect(result.message).to.be.deep.equal(allSales);
    });

    it('Testa se recupera venda por id corretamente', async () => {
        sinon.stub(saleProductService, 'saleById').resolves({
            type: null,
            message: saleId1,
        });

        const result = await saleProductService.saleById(1);

        expect(result.type).to.be.equal(null);
        expect(result.message).to.be.deep.equal(saleId1);
    });

    it('Testa se retorna erro caso procurado uma venda com id inexistente', async () => {
        sinon.stub(saleProductService, 'saleById').resolves({
            type: 'NOT_FOUND',
            message: 'Sale not found',
        })

        const result = await saleProductService.saleById(9);

        expect(result.type).to.be.equal('NOT_FOUND');
        expect(result.message).to.be.equal('Sale not found');
    });

    it('Testa se cadastra nova venda corretamente', async () => {
        sinon.stub(saleProductService, 'registerNewProductSale').resolves({
            type: null,
            message: {
                id: 3,
                itemsSold: newSale,
            },
        });

        const result = await saleProductService.registerNewProductSale(newSale);

        expect(result.type).to.be.equal(null);
        expect(result.message).to.be.deep.equal(rightReturnNew);
    });

    it('Testa se retorna erro caso seja passado um id de produto inexistente', async () => {
        sinon.stub(saleProductService, 'registerNewProductSale').resolves({
            type: 'NOT_FOUND',
            message: 'Product not found',
        });

        const result = await saleProductService.registerNewProductSale(newInvalidIdSale);

        expect(result.type).to.be.equal('NOT_FOUND');
        expect(result.message).to.be.equal('Product not found');
    });

    afterEach(() => {
        sinon.restore();
    });
});