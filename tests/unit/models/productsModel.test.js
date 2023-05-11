const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');

const connection = require('../../../src/db/connection');
const { allProducts } = require('../models/mocks/products.model.mock');

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

    afterEach(() => {
        sinon.restore();
    });
});
