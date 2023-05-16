const { expect } = require('chai');
const sinon = require('sinon');
const { productModel, salesModel, salesProductsModel } = require('../../../src/models');

const connection = require('../../../src/db/connection');
const { allProducts, newProduct } = require('../models/mocks/products.model.mock');
const { allSales, saleId1 } = require('./mocks/sales.mock');

describe('Testes da camada model de produtos', () => {
    it('Testa se retorna a lista completa de produtos corretamente', async () => {
        sinon.stub(connection, 'execute').resolves([allProducts]);

        const productList = await productModel.findAllProducts();

        expect(productList).to.be.deep.equal(allProducts);
    }); 
    
    it('Testa se retorna um produto especifico quando procurado por id', async () => {
        sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);

        const productById = await productModel.findProductById(1);

        expect(productById).to.be.deep.equal(allProducts[0]);
    });

    it('Testa se adiciona um novo produto corretamente', async () => {
        sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

        const result = await productModel.addNewProduct(newProduct);

        expect(result).to.equal(4);
    });

    afterEach(() => {
        sinon.restore();
    });
});

describe('Testes da camada model de vendas', () => {
    it('Testa se adiciona nova venda corretamente', async () => {
        sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

        const result = await salesModel.registerNewSale();

        expect(result).to.equal(4);
    });

    it('Testa se lista todas as vendas corretamente', async () => {
        sinon.stub(connection, 'execute').resolves(allSales);

        const result = await salesModel.getAllSales();

        expect(result).to.be.deep.equal(allSales);
    });

    it('Testa se lista uma venda especifica por id', async () => {
        sinon.stub(connection, 'execute').resolves(saleId1);

        const result = await salesModel.getSaleById(1);

        expect(result).to.be.deep.equal(saleId1);
    });

    afterEach(() => {
        sinon.restore();
    });
});
