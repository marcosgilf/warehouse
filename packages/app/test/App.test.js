import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import sinon from 'sinon';
import { products } from '../../products/mocks/products.js';
import { stock } from '../../products/mocks/stock.js';
import { apiArticles } from '../mocks/apiArticles.js';
import { apiProducts } from '../mocks/apiProducts.js';
import { mockApiResponse } from '../mocks/mockApiResponse.js';
import { endpoints } from '../providers/endpoints.js';

import '../warehouse-app.js';

describe('App', () => {
  let element;
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('initialization', () => {
    beforeEach(async () => {
      sandbox
        .stub(window, 'fetch')
        .withArgs(endpoints.products)
        .resolves(mockApiResponse(apiProducts))
        .withArgs(endpoints.articles)
        .resolves(mockApiResponse(apiArticles));

      element = await fixture(html`<warehouse-app></warehouse-app>`);
    });

    it('should render loading text if products is an unresolved promise', async () => {
      element.products = new Promise(() => 1);
      await nextFrame();
      expect(element.shadowRoot.innerHTML).to.contain('Loading...');
    });

    it('should resolve products provider promise', async () => {
      await nextFrame();
      await nextFrame();
      expect(element.products).to.deep.equal(products);
      expect(element.shadowRoot.querySelector('.products')).dom.to.exist;
    });

    it('should initialize stock property', async () => {
      await nextFrame();
      expect(element.stock).to.deep.equal(stock);
    });
  });
});
