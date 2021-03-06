import { expect } from '@open-wc/testing';
import sinon from 'sinon';
import { products } from '../../../products/mocks/products.js';
import { apiArticles, apiArticlesPatch } from '../../mocks/apiArticles.js';
import { apiProducts } from '../../mocks/apiProducts.js';
import { apiSale } from '../../mocks/apiSales.js';
import { mockApiResponse } from '../../mocks/mockApiResponse.js';
import { endpoints } from '../../providers/endpoints.js';

import { ProductsProvider } from '../../providers/ProductsProvider.js';

describe('ProductsProvider', () => {
  let provider;
  let sandbox;

  before(() => {
    provider = new ProductsProvider();
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('should get products from API', () => {
    it('should make an ajax call', async () => {
      sandbox
        .stub(window, 'fetch')
        .withArgs(endpoints.products)
        .resolves(mockApiResponse(apiProducts));
      const response = await provider.getProducts();
      expect(window.fetch.calledOnce).to.be.true;
      expect(response.length).to.equal(2);
    });

    it('should return an empty object if the ajax call fails', async () => {
      sandbox.stub(console, 'warn');
      sandbox
        .stub(window, 'fetch')
        .withArgs(endpoints.products)
        .resolves(mockApiResponse(apiProducts, 503));
      const response = await provider.getProducts();
      expect(response).to.be.empty;
    });
  });

  describe('should get articles from API', () => {
    it('should make an ajax call', async () => {
      sandbox
        .stub(window, 'fetch')
        .withArgs(endpoints.articles)
        .resolves(mockApiResponse(apiArticles));
      const response = await provider.getArticles();
      expect(window.fetch.calledOnce).to.be.true;
      expect(response.length).to.equal(4);
    });

    it('should return an empty object if the ajax call fails', async () => {
      sandbox.stub(console, 'warn');
      sandbox
        .stub(window, 'fetch')
        .withArgs(endpoints.articles)
        .resolves(mockApiResponse(apiArticles, 503));
      const response = await provider.getArticles();
      expect(response).to.be.empty;
    });
  });

  describe('adaptProducts', () => {
    it('should return products with articles if both params are defined', async () => {
      const result = provider.adaptProducts({
        products: apiProducts,
        articles: apiArticles,
      });
      expect(result).to.deep.equal(products);
    });

    it('should return products without articles if articles param is not defined', async () => {
      const result = provider.adaptProducts({
        products: apiProducts,
        articles: undefined,
      });
      expect(result).to.deep.equal(apiProducts);
    });

    it('should return empty products if products param is not defined', async () => {
      const result = provider.adaptProducts();
      expect(result).to.deep.equal([]);
    });
  });

  describe('postSale', () => {
    it('should perform a POST call to save sale', async () => {
      sandbox
        .stub(window, 'fetch')
        .withArgs(endpoints.sale)
        .resolves(mockApiResponse(apiSale))
        .withArgs(endpoints.articles)
        .resolves(mockApiResponse(apiArticlesPatch));
      const response = await provider.postSale([products[0]]);
      expect(window.fetch.calledTwice).to.be.true;
      expect(window.fetch.args[0][1].body).to.deep.equal(
        JSON.stringify({
          productId: 'a269a247-0d38-4b47-9630-79c9ae545b68',
          amountSold: 1,
        }),
      );
      const postResponse = await response[0];
      expect(postResponse.id).to.equal(apiSale.id);
      const patchResponse = await response[1];
      expect(patchResponse[0].id).to.equal(apiArticlesPatch[0].id);
    });
  });
});
