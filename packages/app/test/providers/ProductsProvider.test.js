import { expect } from '@open-wc/testing';
import sinon from 'sinon';
import { products } from '../../../products/mocks/products.js';
import { apiArticles } from '../../mocks/apiArticles.js';
import { apiProducts } from '../../mocks/apiProducts.js';
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
      sandbox.stub(window, 'fetch')
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
      sandbox.stub(window, 'fetch')
        .withArgs(endpoints.articles)
        .resolves(mockApiResponse(apiArticles, 503));
      const response = await provider.getArticles();
      expect(response).to.be.empty;
    });
  });

  describe('getProductsForUi', () => {
    it('should call providers and adapter', async () => {
      sandbox.stub(provider, 'getProducts');
      sandbox.stub(provider, 'getArticles');
      sandbox.stub(provider, 'adapt');
      await provider.getProductsForUi();
      expect(provider.getProducts.calledOnce).to.be.true;
      expect(provider.getArticles.calledOnce).to.be.true;
      expect(provider.adapt.calledOnce).to.be.true;
    });
  });

  describe('adapt', () => {
    it('should return products with articles if both params are defined', async () => {
      const result = provider.adapt({ products: apiProducts, articles: apiArticles });
      expect(result).to.deep.equal(products);
    });

    it('should return products without articles if articles param is not defined', async () => {
      const result = provider.adapt({ products: apiProducts, articles: undefined });
      expect(result).to.deep.equal(apiProducts);
    });

    it('should return empty products if products param is not defined', async () => {
      const result = provider.adapt();
      expect(result).to.deep.equal([]);
    });
  });
});
