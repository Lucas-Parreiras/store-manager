const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productService, saleProductService } = require('../../../src/services');
const { productController, salesController } = require('../../../src/controllers');

const { allProducts,
    newProduct,
    newInvalidProduct } = require('../models/mocks/products.model.mock');
const { newSale, rightReturnNew, newInvalidIdSale, allSales, saleId1 } = require('../models/mocks/sales.mock');

describe('Testes da camada controller de produto', () => {
    it('Testa se retorna status 200 e lista completa de produtos', async () => {
        const res = {};
        const req = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon
            .stub(productService, 'findAllProducts')
            .resolves({ type: null, message: allProducts });

        await productController.listProducts(req, res);
        
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(allProducts);
    });

    it('Testa se retorna status 200 e o produto procurado pelo id', async () => {
        const res = {};
        const req = {
            params: { id: 1 },
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon
            .stub(productService, 'findProductById')
            .resolves({ type: null, message: allProducts[0] });

        await productController.productById(req, res);
        
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(allProducts[0]);
    });
    
    it('Testa se retorna status 404 e erro quando não existir produto com o id buscado', async () => {
        const res = {};
        const req = {
            params: { id: 1 },
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon
            .stub(productService, 'findProductById')
            .resolves({ type: 'NOT_FOUND', message: 'Product not found' });

        await productController.productById(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
    
    it('Testa se ao enviar dados válidos cadastra novo produto corretamente', async () => {
        const res = {};
        const req = {
            body: newProduct,
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon
            .stub(productService, 'addNewProduct')
            .resolves({ type: null, message: newProduct });

        await productController.addNewProduct(req, res);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(newProduct);
    });

    afterEach(() => {
        sinon.restore();
    });
});

describe('Testes da camamada controller de vendas', () => {
    it('Testa se passado corpo corretamente retorna status e mensagem correta', async () => {
        const res = {};
        const req = {
            body: newSale,
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(saleProductService, 'registerNewProductSale')
            .resolves({
                type: null,
                message: rightReturnNew,
            });

        await salesController.registerNewSale(req, res);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(rightReturnNew);
    });

    it('Testa se fornecido corpo de venda com id de produto inexistente retorna erro', async () => {
        const res = {};
        const req = {
            body: newInvalidIdSale,
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(saleProductService, 'registerNewProductSale')
            .resolves({
                type: 'NOT_FOUND',
                message: 'Product not found',
            });

        await salesController.registerNewSale(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Testa se retorna corretamente listagem de todas as vendas', async () => {
        const res = {};
        const req = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(saleProductService, 'getAllSales')
            .resolves({
                type: null,
                message: allSales,
            });

        await salesController.getAllSales(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(allSales);
    });

    it('Testa se recupera venda corretamente quando procurado por id', async () => {
        const res = {};
        const req = {
            params: {
                id: 1,
            },
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(saleProductService, 'saleById')
            .resolves({
                type: null,
                message: saleId1,
            });

        await salesController.saleById(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(saleId1);
    });

    it('Testa se deleta uma venda corretamente', async () => {
        const res = {};
        const req = {
            params: {
                id: 1,
            },
        };

        res.status = sinon.stub().returns(res);
        res.end = sinon.stub();

        sinon.stub(saleProductService, 'deleteSaleById')
            .resolves({
                type: null,
                message: 'Deleted',
            });

        await salesController.deleteSaleById(req, res);

        expect(res.status).to.have.been.calledWith(204);
        expect(res.end).to.have.been.called;
    });

    afterEach(() => {
        sinon.restore();
    });
});